import 'dotenv/config';
import cors from 'cors'
import express from 'express'
import { AppDataSource } from './database/db'
import { router } from './router';

const app = express();
const port = process.env.PORT_CONECTION || 3050;

app.use(cors())
app.use(express.json());

app.use('/api', router)


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