import { Request } from 'express';
export declare function fileUpload({ fileType, storageType, }: {
    fileType: string[];
    storageType?: string;
}): {
    storage: any;
    fileFilter: (req: Request, file: Express.Multer.File, cb: Function) => void;
};
