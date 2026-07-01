"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const lib_storage_1 = require("@aws-sdk/lib-storage");
const multer_base_enum_js_1 = require("../enum/multer.base.enum.js");
const node_fs_1 = __importDefault(require("node:fs"));
const common_1 = require("@nestjs/common");
let s3services = class s3services {
    _client;
    constructor() {
        this._client = new client_s3_1.S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });
    }
    async uploadFile({ file, storageType = multer_base_enum_js_1.multerStorageEnum.memory, ACL, path, }) {
        const command = new client_s3_1.PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: `${path}/${Date.now()}/${Math.random()}/${file.originalname}`,
            ACL,
            Body: storageType == multer_base_enum_js_1.multerStorageEnum.memory
                ? file.buffer
                : node_fs_1.default.createReadStream(file.path),
        });
        await this._client.send(command);
        if (!command.input.Key) {
            throw new common_1.InternalServerErrorException('failed to upload file');
        }
        return command.input.Key;
    }
    async uploadLargeFile({ file, storageType = multer_base_enum_js_1.multerStorageEnum.memory, ACL, path, }) {
        const command = new lib_storage_1.Upload({
            client: this._client,
            params: {
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: `${process.env.APPLICATION_NAME}/${path}/${Date.now()}/${Math.random()}/${file.originalname}`,
                ACL,
                Body: storageType == multer_base_enum_js_1.multerStorageEnum.memory
                    ? file.buffer
                    : node_fs_1.default.createReadStream(file.path),
                ContentType: file.mimetype,
            },
        });
        command.on('httpUploadProgress', function (progress) {
            console.log('file progress is ', progress);
        });
        return command.done;
    }
    async createSignedUrl({ fileName, path, ContentType, expiresIn = 3 * 60, }) {
        const Key = `social_media_app/${path}/${Math.random() * 10000}/${fileName}`;
        const command = new client_s3_1.PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            ContentType,
            Key,
        });
        const url = await (0, s3_request_presigner_1.getSignedUrl)(this._client, command, { expiresIn });
        return { Key, url };
    }
    async getFiles(folderName) {
        const command = new client_s3_1.ListObjectsV2Command({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Prefix: `social_media_app/${folderName}`,
        });
        return await this._client.send(command);
    }
    async getFile(Key) {
        const command = new client_s3_1.GetObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key,
        });
        return await this._client.send(command);
    }
    async getSignedUrl({ Key, expiresIn = 3 * 60, download, }) {
        const command = new client_s3_1.PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key,
            ContentDisposition: download
                ? `attachment ; filename-="${Key.split('/').pop()}"`
                : undefined,
        });
        return await (0, s3_request_presigner_1.getSignedUrl)(this._client, command, { expiresIn });
    }
    async deleteFile({ Key }) {
        const command = new client_s3_1.DeleteObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key,
        });
        return await this._client.send(command);
    }
    async deleteFiles({ Keys }) {
        const keyMapped = Keys.map((k) => {
            return { Key: k };
        });
        const command = new client_s3_1.DeleteObjectsCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Delete: {
                Objects: keyMapped,
                Quiet: false,
            },
        });
        return await this._client.send(command);
    }
    async deleteFolder({ folderKey }) {
        const files = await this.getFiles(folderKey);
        const folder = files.Contents?.map((file) => {
            return file.Key;
        });
        this.deleteFiles({ Keys: folder });
    }
};
s3services = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], s3services);
exports.default = s3services;
//# sourceMappingURL=s3Services.js.map