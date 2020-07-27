import mongoose from 'mongoose';
import mongodb from 'mongodb';

export default async (): Promise<mongodb.Db> => {
    if (!process.env.mongo_uri) {
        throw Error('No database url found');
    }

    const connection = await mongoose.connect(process.env.mongo_uri, {useNewUrlParser: true});
    return connection.connection.db;
};
