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

global.onlineUsers = new Map();

io.on("connection", (socket) => {

    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id)
        console.log("user id is:", userId)
    })

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to)
        console.log({ data })
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.message)


        }
    })
})




export default server; 