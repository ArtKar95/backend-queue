import { customErrors } from '../config/customErrors';
import type { Application, NextFunction, Request, Response } from 'express';
import type { ICustomError } from '../types/model';

// format errors in one style
const formatError = (err: ICustomError): ICustomError => {
    if (err.errors) {
        // format mongo unique error
        const errorKey: string = Object.keys(err.errors)[0];
        return {
            ...customErrors.duplicationDetected,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            message: err.errors[errorKey].message,
        };
    } else {
        return {
            type: err.type,
            message: err.message,
            private: err.private || false,
            status: err.status || 500,
        };
    }
};

export default function (app: Application): void {
    // catch 404 and forward to error handler
    app.use((_req: Request, _res: Response, next: NextFunction) => {
        next(customErrors.routeNotFound);
    });

    // error handler
    app.use(
        (
            err: ICustomError,
            _req: Request,
            res: Response,
            next: NextFunction,
        ) => {
            const error = formatError(err);
            let unexpectedError = false;

            // show errors for developers
            if (!error.status || error.status >= 500 || error.private) {
                unexpectedError = true;
                /* eslint-disable no-alert, no-console */
                console.log('####################');
                console.log(err);
                console.log('####################');
            }

            if (unexpectedError) {
                res.status(500).json({ error: customErrors.defaultError });
            } else {
                res.status(error.status).json({ error });
            }
            next();
        },
    );
}
