import mongoose, { Schema } from 'mongoose';
import auth from '../config/auth.config';
import type { IToken } from '../types/model';
const { ObjectId } = Schema.Types;
const TokenSchema = new Schema<IToken>(
    {
        owner: {
            type: ObjectId,
            required: true,
        },
        refreshToken: {
            type: String,
            required: true,
        },
        jwt: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    },
).index({ created_at: 1 }, { expireAfterSeconds: auth.jwt.exp });

export default mongoose.model<IToken>('Token', TokenSchema);
