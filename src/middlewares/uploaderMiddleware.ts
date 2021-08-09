import type { Request, Response, NextFunction } from 'express';
import { IncomingForm } from 'formidable';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import type { ICustomError, IFile } from '../types/model';
import {
    fileSizeValidator,
    fileTypeValidator,
    getFileExtention,
} from '../../utils/fileUtils';
import fs from 'fs';

const uploader = (req: Request, res: Response, next: NextFunction): void => {
    const form = new IncomingForm({
        keepExtensions: true,
        multiples: true,
    });
    const uploadDir = path.join(__dirname, '../../../uploads/avatars/');

    form.on('field', (name: string, value: string) => {
        req.body[name] = value;
    })
        .on('file', (_name: string, file: IFile) => {
            const fileSizeValidationError = fileSizeValidator(file);
            if (fileSizeValidationError) return next(fileSizeValidationError);
            const fileTypeValidationError = fileTypeValidator(file);
            if (fileTypeValidationError) return next(fileTypeValidationError);
            const fileName =
                uuidv4() + '' + uuidv4() + '.' + getFileExtention(file.type);
            fs.rename(file.path, path.join(uploadDir, fileName), (err) => {
                if (err) return next(err);
            });
            res.locals.avatar = {
                name: fileName,
                size: file.size,
                type: file.type,
                path: path.join(uploadDir, fileName),
            };
        })
        .on('end', () => {
            next();
        })
        .on('error', (err: ICustomError) => {
            next(err);
        });
    form.parse(req);
};
export default uploader;
