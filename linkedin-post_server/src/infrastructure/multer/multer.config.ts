import { diskStorage } from 'multer';
import { extname } from 'path';
import { BadRequestException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

const allowedMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/jpg',
  'image/webp',
  'image/gif',
  'video/mp4',
  'video/webm',
  'video/quicktime',
];

export const postMediaMulterConfig = {
  storage: diskStorage({
    destination: './uploads',

    filename: (req, file, cb) => {
      const uniqueName = uuid() + extname(file.originalname);
      cb(null, uniqueName);
    },
  }),

  fileFilter: (req: any, file: any, cb: any) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(
        new BadRequestException('Only images, gifs, and videos are allowed'),
        false,
      );
    }

    cb(null, true);
  },

  limits: {
    fileSize: 20 * 1024 * 1024,
  },
};
