import { ObjectCannedACL } from '@aws-sdk/client-s3';
declare class s3services {
    private _client;
    constructor();
    uploadFile({ file, storageType, ACL, path, }: {
        file: Express.Multer.File;
        storageType?: string;
        ACL?: ObjectCannedACL;
        path?: string | undefined;
    }): Promise<string>;
    uploadLargeFile({ file, storageType, ACL, path, }: {
        file: Express.Multer.File;
        storageType?: string;
        ACL?: ObjectCannedACL;
        path?: string | undefined;
    }): Promise<() => Promise<import("@aws-sdk/client-s3").CompleteMultipartUploadCommandOutput>>;
    createSignedUrl({ fileName, path, ContentType, expiresIn, }: {
        fileName: string;
        path: string;
        ContentType: string;
        expiresIn?: number;
    }): Promise<{
        Key: string;
        url: string;
    }>;
    getFiles(folderName: string): Promise<any>;
    getFile(Key: string): Promise<any>;
    getSignedUrl({ Key, expiresIn, download, }: {
        Key: string;
        expiresIn?: number;
        download?: boolean;
    }): Promise<string>;
    deleteFile({ Key }: {
        Key: string;
    }): Promise<any>;
    deleteFiles({ Keys }: {
        Keys: string[];
    }): Promise<any>;
    deleteFolder({ folderKey }: {
        folderKey: string;
    }): Promise<void>;
}
export default s3services;
