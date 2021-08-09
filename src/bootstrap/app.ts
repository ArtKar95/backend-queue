import type { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../swagger.json';
import errorHandler from './errorHandler';
import userRouter from '../routes/userRouter';
import institutionRouter from '../routes/institutionRouter';
import institutionTypeRouter from '../routes/institutionTypeRouter';
import specialtyRouter from '../routes/specialtyRouter';
import groupRouter from '../routes/groupRouter';
import path from 'path';

const app = express();
app.use(bodyParser.json({ limit: '5mb' }));
app.use(
    bodyParser.urlencoded({
        limit: '5mb',
        extended: true,
    }),
);

const logger = morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'),
        '-',
        tokens['response-time'](req, res),
        'ms',
    ].join(' ');
});
app.use(logger);
app.use(cors());
app.set('showStackError', true);
app.use(helmet());
app.use((_req: Request, res: Response, next: NextFunction) => {
    res.setHeader(
        'Access-Control-Allow-Origin',
        process.env.CLIENT_HOST || '*',
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With,content-type',
    );
    next();
});

app.enable('case sensitive routing');
app.enable('strict routing');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/user', userRouter);
app.use('/institution', institutionRouter);
app.use('/institution-types', institutionTypeRouter);
app.use('/specialty', specialtyRouter);
app.use('/group', groupRouter);
app.use(
    '/file',
    express.static(path.join(__dirname, '../../../uploads/avatars')),
);
errorHandler(app);

export default app;
