import multer from 'multer';
import { multerStorageEnum } from '../enum/multer.base.enum';
import { tmpdir } from 'node:os';
import { Request } from 'express';

export function fileUpload({
  fileType,
  storageType = multerStorageEnum.memory,
}: {
  fileType: string[];
  storageType?: string;
}) {
  const storage: any =
    storageType == multerStorageEnum.memory
      ? multer.memoryStorage()
      : multer.diskStorage({
          destination: tmpdir(),
          filename: (req: Request, file: Express.Multer.File, cb: Function) => {
            const prefix = Math.random();
            cb(null, prefix);
          },
        });

  return {
    storage,
    fileFilter: function fileFilter(
      req: Request,
      file: Express.Multer.File,
      cb: Function
    ) {
      if (fileType.includes(file.mimetype)) cb(null, true);
      cb(null, false);
    },
  };
}
