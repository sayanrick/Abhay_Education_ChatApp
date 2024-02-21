const http = require('http');
const express = require("express");
const path = require('path');
const { Server } = require('socket.io');
const { Socket } = require('dgram');
const PORT = 8000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Socket.io
io.on("connection", Socket => {
    Socket.on("user-msg", msg => {
        console.log("A new user message:- ", msg);
        io.emit("msg", msg)
    })
})

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
    return res.sendFile("./public/index.html")
})

server.listen(PORT, ()=> {
    console.log(`Server Started on PORT: ${PORT}`);
})