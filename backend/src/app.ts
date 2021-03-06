import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request } from 'express';
import connectDB from './db';
import { api } from './routes/api';

dotenv.config();

const init = (): void => {
    const app = express();
    const corsOptionsDelegate = (req: Request, callback: any): void => {
        const corsOptions = { origin: true, credentials: true }; // reflect (enable) the requested origin in the CORS response
        callback(null, corsOptions); // callback expects two parameters: error and options
    };
    app.use(cors(corsOptionsDelegate));
    app.use(express.json());
    app.use('/api', api);

    app.listen(process.env.app_port, () => {
        console.log(`App is listening on port ${process.env.app_port}`);
    });
};

connectDB()
    .then(() => {
        init();
    })
    .catch((err) => {
        console.error(err);
    });
