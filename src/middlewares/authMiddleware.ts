import type { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth.config';
import { customErrors } from '../config/customErrors';
import type { ITokenData } from '../types/model';

export default async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    //Get auth header value
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) {
        return res
            .status(customErrors.notAuthorized.status)
            .json({ error: customErrors.notAuthorized })
            .end();
    }

    const bearer = authorizationHeader.split(' ');

    //Check if bearer is undefined
    if (
        bearer[0].toLowerCase() !== 'bearer' ||
        typeof bearer[1] === 'undefined'
    ) {
        return res
            .status(customErrors.bearerInvalid.status)
            .json({ error: customErrors.bearerInvalid })
            .end();
    }

    const access_token = bearer[1];

    if (!access_token) {
        return res
            .status(customErrors.notAuthorized.status)
            .json({ error: customErrors.notAuthorized })
            .end();
    }
    try {
        const token_data: ITokenData = await verify(
            access_token,
            authConfig.jwt.secret,
        );
        res.locals.userId = token_data.userId;
        return next();
    } catch (err) {
        res.status(customErrors.jsonWebTokenError.status)
            .json({ error: customErrors.jsonWebTokenError })
            .end();
    }
};
