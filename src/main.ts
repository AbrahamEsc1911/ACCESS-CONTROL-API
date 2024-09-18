import 'dotenv/config';
import express from 'express';
import { AppDataSource } from './database/db'

const app = express();
const port = process.env.PORT_CONECTION || 3050;

app.use(express.json());


AppDataSource.initialize()
    .then(() => {
        console.log('Database connected');
        app.listen(port, () => {
            console.log(`Server is running on ${port}`)
        })
    })
    .catch(error => {
        console.log(error)
    })