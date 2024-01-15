import express from 'express';
import { config } from 'dotenv';
import userRouter from './router/userRouter.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'






config({
    path: './data/config.env'
})

const app = express()

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3001', // replace with the origin of your frontend
    credentials: true,
}));

app.use(cookieParser());

app.use(userRouter)

app.get('/', (req, res) => {
    res.send("Hi from /")

})

export default app; 