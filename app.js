require('dotenv').config();

const cors = require("cors");
const express = require("express");
const logger = require('morgan');
const http = require('http');
const { Server } = require('socket.io');
const routes = require("./src/routes/noteRouter");
const controllers = require("./src/controllers/notes");

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())
app.use(logger('dev'))



const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// socket.io setup
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('noteUpdated', async (data, res) => {
        try {
            const { id, noteData } = data;
            // Call the updateNote function to handle the update
            const updatedNote = await controllers.updateNote(res,id, noteData);
            socket.emit('noteUpdated', updatedNote);
        } catch (error) {
            console.error(error);
            socket.emit('error', error.message);
        }
    });
});
app.use("/api", routes);

server.listen(PORT, () => console.log(`Notefy server on port ${PORT}`));
