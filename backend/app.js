import express from 'express';
import { config } from 'dotenv';
import userRouter from './router/userRouter.js'
import messagesRouter from './router/messagesRouter.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { Server } from 'socket.io';
import { createServer } from 'http';




config({
    path: './data/config.env'
})

const app = express()


const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3001',
        methods: ["GET", "POST"],
        credentials: true,
    }
})



app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3001', // replace with the origin of your frontend
    credentials: true,
}));

app.use(cookieParser());

app.use(userRouter)
app.use(messagesRouter)

app.get('/', (req, res) => {
    res.send("Hi from /")

})


io.on("connection", (socket) => {
    console.log("user connected")
    console.log("Id :", socket.id)
    socket.emit("welcome", `Welcome to the server ${socket.id}`)
    socket.on("message", ({ room, msg }) => {
        console.log(room, msg, socket.id)
        io.to(room).emit('receive-message', msg)

    })
    socket.on("disconnect", () => {
        console.log("user disconnect", socket.id)

    })
})




export default server; 