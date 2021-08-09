import type { Document, Types } from 'mongoose';

export interface IMongoConfig {
    connection: {
        url: string;
    };
}

export interface ICustomError {
    type: string;
    message: string;
    status: number;
    private: boolean;
    errors?: Array<IErrors>;
}

export interface IErrors {
    message?: string;
    keyword?: string;
    instancePath?: string;
}

export interface IGenerateJWTPayload {
    timestamp?: string;
    userId?: string;
}

export interface IGenerateJWTReturn {
    jwt: string;
    refreshToken: string;
}

export interface ITokenData {
    userId: string;
}

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
    institution: IInstitution;
}

export interface IInstitution extends Document {
    name: string;
    email: string;
    address: string;
    phone: number;
    type: string;
    description?: string;
    logo?: string;
    group?: IGroup;
    creator: IUser;
}

export interface IGroup extends Document {
    name: string;
    institutions?: Array<string>;
    logo?: string;
    description: string;
    creator: IUser;
}

export interface IToken extends Document {
    owner: Types.ObjectId;
    refreshToken: string;
    jwt: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IInstitutionType extends Document {
    name: string;
}

export interface IQueue extends Document {
    code: string;
    institution: string;
    category: string;
}

export interface IFiles {
    files: Array<{
        name: string;
        size: number;
        type: string;
        path: string;
    }>;
}

export interface IFile {
    name: string;
    path: string;
    size: number;
    extension: string;
    type: string;
    content: ArrayBuffer;
}

export interface IDivision extends Document {
    name: string;
}

export interface ISpecialty extends Document {
    name: string;
}
