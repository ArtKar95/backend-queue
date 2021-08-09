import dotenv from 'dotenv';
const envPath = '.env';
dotenv.config({ path: envPath });
import app from './src/bootstrap/app';
import type { IMongoConfig } from './src/types/model';
import mongo from './src/bootstrap/mongo';
import { createServer } from 'http';
import type { AnyARecord } from 'dns';

/* eslint-disable no-alert, no-console */
const server = createServer(app);
const mongoConfig: IMongoConfig = {
    connection: {
        url: process.env.MONGO_API,
    },
};
const port = +process.env.PORT;
if (!port) {
    console.error('No valid port specified');
    process.exit(1);
}

mongo(mongoConfig as IMongoConfig)
    .then(() => {
        const port = +process.env.PORT;
        if (!port) {
            console.error('No valid port specified');
            process.exit(1);
        }
        const fullApiHost = `localhost:${port}`;
        console.log(
            `-------------------- API is running on ${fullApiHost} --------------------`,
        );
        console.log('Database connection has been established successfully.');
        server.listen(process.env.PORT, +process.env.HOST);
        // server.listen(port);
        // if (process.env.NODE_ENV === 'dev') {
        //     console.log(
        //         `API documentation is available in http://${fullApiHost}/api-docs`,
        //     );
        // }
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
        process.exit(1);
    });

server.on('error', onError);

function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') throw error;

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    console.log('----------------- App unexpectedly stopped -----------------');
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.log(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
