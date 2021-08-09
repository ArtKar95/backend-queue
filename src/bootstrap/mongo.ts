import type { IMongoConfig } from '../types/model';
import mongoose from 'mongoose';
import type { ConnectOptions } from 'mongoose';

export default (mongoConfig: IMongoConfig): Promise<typeof mongoose> => {
    return mongoose.connect(mongoConfig.connection.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions);
};
