import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
    },
});


app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
}));

app.get("/", (req, res) => {
    res.send("Hello World");
});

io.on("connection", (socket) => {
    console.log(`Connected and having socket id: ${socket.id}`);

    socket.on("message", ({ message, to }) => {
        socket.to(to).emit("receive", message);
    });
    socket.on("broadcast", (message) => {
        socket.broadcast.emit("receive", message);
    });
    
    socket.on("disconnect", () => {
        console.log("Disconnected from server");
    });
});

server.listen(8080, () => {
    console.log("listening on :8080");
});