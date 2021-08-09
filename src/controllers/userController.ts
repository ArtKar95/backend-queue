import { Promise } from 'bluebird';
import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import type { IGenerateJWTPayload, IGenerateJWTReturn } from '../types/model';
import crypto from 'crypto';
import authConfig from '../config/auth.config';
import bcrypt from 'bcryptjs';
import TokenSchema from '../schemas/tokenSchema';
import { customErrors } from '../config/customErrors';
import User from '../schemas/userSchema';

class UserController {
    create = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { firstName, lastName, email, password, role } = req.body;
            const hashedPassword = await this.generatePassHash(password);
            const user = new User({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role,
            });
            await user.save();
            res.status(201).json({ success: true });
        } catch (err) {
            next(err);
        }
    };

    signIn = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const data = req.body;
            const user = await User.findOne({ email: data.email });
            if (!user) throw customErrors.emailOrPasswordNotFound;

            const match = await bcrypt.compare(
                authConfig.pass.prefix + data.password,
                user.password,
            );
            if (!match) throw customErrors.emailOrPasswordNotFound;

            const token = await this.generateJWT({ userId: user._id });
            const tokenModel = new TokenSchema({
                owner: user._id,
                refreshToken: token.refreshToken,
                jwt: token.jwt,
            });

            await tokenModel.save();
            res.json(token);
        } catch (error) {
            next(error);
        }
    };

    generateToken = (length = 12): Promise<string> => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(length, (err, buffer) => {
                if (err) return reject(err);
                return resolve(buffer.toString('hex'));
            });
        });
    };

    generateJWT = (
        payload: IGenerateJWTPayload,
    ): Promise<IGenerateJWTReturn> => {
        return Promise.try(() =>
            jwt.sign(
                { ...payload, timestamp: Date.now() },
                authConfig.jwt.secret,
                { expiresIn: authConfig.jwt.exp },
            ),
        ).then(async (jwt: string) => {
            const refreshToken = await this.generateToken(
                authConfig.refreshToken.size,
            );
            return { jwt, refreshToken };
        });
    };
    updateToken = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const id = req.params.id;
            let token = await TokenSchema.findOne({
                owner: id,
                refreshToken: req.body.refreshToken,
            });

            if (!token) throw customErrors.wrongRefreshToken;

            //check the expiration of the refresh token
            if (
                new Date().getTime() - new Date(token.updatedAt).getTime() >=
                authConfig.refreshToken.exp
            ) {
                throw customErrors.invalidRefreshToken;
            }
            const newTokenPair = await this.generateJWT({ userId: id });
            token = Object.assign(token, newTokenPair);

            await token.save();
            res.json(newTokenPair);
        } catch (err) {
            next(err);
        }
    };
    generatePassHash = (password: string): Promise<void> =>
        bcrypt.hash(
            authConfig.pass.prefix + password,
            authConfig.pass.salt_rounds,
        );
    getUser = async (
        _req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const user = await User.findById(res.locals.userId);
            res.json(user);
        } catch (err) {
            next(err);
        }
    };
}

export default new UserController();
