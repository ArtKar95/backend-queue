import type { NextFunction, Request, Response } from 'express';
import type { ICustomError, IErrors } from '../types/model';
import fs from 'fs';
import path from 'path';
import addFormats from 'ajv-formats';
import Ajv from 'ajv';
import AjvErrors from 'ajv-errors';

const basename = path.basename(__filename);
const validator = new Ajv({
    allErrors: true,
    removeAdditional: 'all',
    $data: true,
});
addFormats(validator);
AjvErrors(validator);

fs.readdirSync('./src/validation')
    .filter((file: string) => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-7) === '.v.json'
        );
    })
    .forEach((file: string) => {
        const schemaName = file.slice(0, -7);
        validator.addSchema(require('../validation/' + file), schemaName);
    });

const errorResponse = ([error]: [IErrors]): { error: ICustomError } => {
    const errorNameArr = error.instancePath.split('/');
    let errorName = errorNameArr[errorNameArr.length - 1];
    errorName = errorName.substr(0, 1).toUpperCase() + errorName.substr(1);
    return {
        error: {
            type: 'ValidationError',
            message: `${errorName} ${error.message}`,
            private: false,
            status: 422,
        },
    };
};

export default (schemaName: string) =>
    (req: Request, res: Response, next: NextFunction): void => {
        const validationData = {
            body: req.body,
            query: req.query,
            params: req.params,
        };
        const isValid = validator.validate(schemaName, validationData);
        if (!isValid) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return res.status(422).json(errorResponse(validator.errors)).end();
        }
        next();
    };
