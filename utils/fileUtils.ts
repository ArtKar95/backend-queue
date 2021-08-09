import {
    allowedFileExtensions,
    uploadedFileSizeLimit,
} from '../src/config/attachment.config';
import { customErrors } from '../src/config/customErrors';
import type { ICustomError, IFile } from '../src/types/model';

export const getFileExtention = (fileName: string): string => {
    const ext = /(?:\/([^/]+))?$/.exec(fileName)[1];
    return ext?.toLowerCase();
};

export const fileSizeValidator = (file: IFile): ICustomError => {
    return file.size / 1024 > uploadedFileSizeLimit * 1024
        ? customErrors.fileSizeValidationError
        : null;
};

export const fileTypeValidator = (file: IFile): ICustomError => {
    const fileExt = getFileExtention(file.type);
    if (!fileExt) return customErrors.imageTypeValidationError;
    const isMatch = allowedFileExtensions.some((extension) =>
        extension.test(fileExt),
    );
    return !isMatch ? customErrors.imageTypeValidationError : null;
};
