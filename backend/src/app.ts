import dotenv from 'dotenv';

dotenv.config();
import express, {Request} from 'express';
import cors from 'cors';
import connectDB from './db';
import {api} from "./routes/api";

const init = (): void => {
    const app = express();
    const corsOptionsDelegate = function (req: Request, callback: any):void {
        let corsOptions;
        corsOptions = { origin: true, credentials: true }; // reflect (enable) the requested origin in the CORS response
        callback(null, corsOptions) // callback expects two parameters: error and options
    };
    app.use(cors(corsOptionsDelegate));
    app.use(express.json());
    app.use('/api', api);

    app.listen(process.env.app_port, function () {
        console.log(`App is listening on port ${process.env.app_port}`);
    });

}

connectDB()
    .then(value => {
        init();
    })
    .catch(err => {
        console.error(err);
    })
