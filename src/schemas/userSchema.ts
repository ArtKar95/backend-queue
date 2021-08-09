import mongoose, { Schema } from 'mongoose';
import type { IUser } from '../types/model';
const { ObjectId } = Schema.Types;
import beautifyUnique from 'mongoose-beautiful-unique-validation';

const UserSchema = new Schema<IUser>({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: 'A user with ({VALUE}) email already exists',
        trim: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    role: {
        type: String,
        enum: [
            'super-admin',
            'institution-admin',
            'institution-manager',
            'institution-employee',
        ],
        default: 'institution-admin',
        required: true,
    },
    institutions: [
        {
            type: ObjectId,
            ref: 'Institution',
        },
    ],
});

UserSchema.plugin(beautifyUnique);

export default mongoose.model<IUser>('User', UserSchema);
