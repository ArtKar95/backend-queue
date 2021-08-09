import { uploadedFileSizeLimit } from './attachment.config';

export const customErrors = {
    defaultError: {
        type: 'UnexpectedError',
        message: 'Something went wrong please try again later',
        private: true,
        status: 500,
    },
    userExists: {
        type: 'DuplicationError',
        message: 'User with email address already exists',
        private: false,
        status: 409,
    },
    jwtNotExists: {
        type: 'JWTError',
        message: 'JWT does not exists',
        private: false,
        status: 404,
    },
    notAuthorized: {
        type: 'AuthError',
        message: 'Not Authorized',
        private: false,
        status: 401,
    },
    jsonWebTokenError: {
        type: 'JWTError',
        message: 'Invalid JWT',
        private: false,
        status: 401,
    },
    tokenExpiredError: {
        type: 'JWTError',
        message: 'Token is expired',
        private: false,
        status: 401,
    },
    userNotFound: {
        type: 'NotFoundError',
        message: 'User is not found',
        private: false,
        status: 404,
    },
    groupNotFound: {
        type: 'NotFoundError',
        message: 'Group is not found',
        private: false,
        status: 404,
    },
    institutionNotFound: {
        type: 'NotFoundError',
        message: 'Institution is not found',
        private: false,
        status: 404,
    },
    emailOrPasswordNotFound: {
        type: 'AuthError',
        message: 'Invalid login or password',
        private: false,
        status: 403,
    },
    duplicationDetected: {
        type: 'DuplicationError',
        message: 'Duplication detected',
        private: false,
        status: 409,
    },
    wrongRefreshToken: {
        type: 'AuthError',
        message: 'Refresh token not found',
        status: 401,
    },
    invalidRefreshToken: {
        type: 'AuthError',
        message: 'Refresh token is invalid',
        private: false,
        status: 401,
    },
    bearerInvalid: {
        type: 'AuthError',
        message: 'Bearer is invalid',
        private: false,
        status: 401,
    },
    notFound: {
        type: 'NotFoundError',
        message: 'Resource not found',
        private: false,
        status: 404,
    },
    routeNotFound: {
        type: 'NotFoundError',
        message: "Route doesn't exist",
        private: false,
        status: 404,
    },
    imageTypeValidationError: {
        type: 'imageTypeValidationError',
        message: 'File type must be jpg, jpeg or png',
        private: false,
        status: 422,
    },
    fileSizeValidationError: {
        type: 'fileSizeValidationError',
        message: `File size must be less than ${uploadedFileSizeLimit} mb`,
        private: false,
        status: 422,
    },
};
