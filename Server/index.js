const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io')
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
});


io.on('connection', (socket) => {
    console.log(`user connected : ${socket.id}`);

    socket.on('join room', (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room : ${data}`);
    })

    socket.on('send_msg',(data) =>{
        socket.to(data.room).emit('recieve message', data);
    } )

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
    });
});


server.listen(3001, () => {
    console.log('server running');
})