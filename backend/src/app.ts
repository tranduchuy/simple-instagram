import dotenv from 'dotenv';

dotenv.config();
import express from 'express';
import connectDB from './db';

const init = (): void => {
    const app = express();
    app.use(express.json());

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
