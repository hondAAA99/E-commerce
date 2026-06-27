import {
  Bucket$,
  DeleteObjectCommand,
  DeleteObjectsCommand,
  GetObjectCommand,
  GetObjectCommandInput,
  ListObjectsV2Command,
  ObjectCannedACL,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Upload } from '@aws-sdk/lib-storage';
import { multerStorageEnum } from '../enum/multer.base.enum.js';
import fs from 'node:fs';
import { v4 as uuidv4 } from 'uuid';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
class s3services {
  private _client;
  constructor() {
    this._client = new S3Client({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
  }

  async uploadFile({
    file,
    storageType = multerStorageEnum.memory,
    ACL,
    path,
  }: {
    file: Express.Multer.File;
    storageType?: string;
    ACL?: ObjectCannedACL;
    path?: string | undefined;
  }) {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: `${path}/${Date.now()}/${Math.random()}/${file.originalname}`,
      ACL,
      Body:
        storageType == multerStorageEnum.memory
          ? file.buffer
          : fs.createReadStream(file.path),
    });

    await this._client.send(command);
    if (!command.input.Key) {
      throw new InternalServerErrorException('failed to upload file');
    }
    return command.input.Key;
  }

  async uploadLargeFile({
    file,
    storageType = multerStorageEnum.memory,
    ACL,
    path,
  }: {
    file: Express.Multer.File;
    storageType?: string;
    ACL?: ObjectCannedACL;
    path?: string | undefined;
  }) {
    const command = new Upload({
      client: this._client,
      params: {
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: `${process.env.APPLICATION_NAME!}/${path}/${Date.now()}/${Math.random()}/${file.originalname}`,
        ACL,
        Body:
          storageType == multerStorageEnum.memory
            ? file.buffer
            : fs.createReadStream(file.path),
        ContentType: file.mimetype,
      },
    });

    command.on('httpUploadProgress', function (progress) {
      console.log('file progress is ', progress);
    });

    return command.done;
  }

  // async uploadFiles({
  //   files,
  //   storageType = multerStorageEnum.memory,
  //   ACL,
  //   path,
  //   large,
  // }: {
  //   files: Express.Multer.File[];
  //   storageType?: string;
  //   ACL?: ObjectCannedACL;
  //   path?: string | undefined;
  //   large: boolean[];
  // }): Promise<string[] | any> {
  //   if (!large) {
  //     const urls = await Promise.all(
  //       files.map((file: Express.Multer.File) => {
  //         this.uploadFile({ file, storageType, path });
  //       })
  //     );
  //     return urls;
  //   } else {
  //     const urls = await Promise.all(
  //       files.map((file: Express.Multer.File) => {
  //         this.uploadLargeFile({ file, storageType, path });
  //       })
  //     );
  //     return urls;
  //   }
  // }

  async createSignedUrl({
    fileName,
    path,
    ContentType,
    expiresIn = 3 * 60,
  }: {
    fileName: string;
    path: string;
    ContentType: string;
    expiresIn?: number;
  }) {
    const Key = `social_media_app/${path}/${Math.random() * 10000}/${fileName}`;
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      ContentType,
      Key,
    });

    const url = await getSignedUrl(this._client, command, { expiresIn });

    return { Key, url };
  }

  async getFiles(folderName: string) {
    const command = new ListObjectsV2Command({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Prefix: `social_media_app/${folderName}`,
    });
    return await this._client.send(command);
  }
  async getFile(Key: string) {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key,
    });
    return await this._client.send(command);
  }

  async getSignedUrl({
    Key,
    expiresIn = 3 * 60,
    download,
  }: {
    Key: string;
    expiresIn?: number;
    download?: boolean;
  }) {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key,
      ContentDisposition: download
        ? `attachment ; filename-="${Key.split('/').pop()}"`
        : undefined,
    });

    return await getSignedUrl(this._client, command, { expiresIn });
  }

  async deleteFile({ Key }: { Key: string }) {
    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key,
    });

    return await this._client.send(command);
  }

  async deleteFiles({ Keys }: { Keys: string[] }) {
    const keyMapped = Keys.map((k) => {
      return { Key: k };
    });
    const command = new DeleteObjectsCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Delete: {
        Objects: keyMapped,
        Quiet: false,
      },
    });

    return await this._client.send(command);
  }

  async deleteFolder({ folderKey }: { folderKey: string }) {
    const files = await this.getFiles(folderKey);

    const folder = files.Contents?.map((file) => {
      return file.Key;
    }) as string[];

    this.deleteFiles({ Keys: folder });
  }
}

export default s3services;
