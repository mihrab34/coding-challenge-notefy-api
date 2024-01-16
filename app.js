require('dotenv').config();

const cors = require("cors");
const express = require("express");
const logger = require('morgan');
const { Server } = require('socket.io');
const routes = require("./src/routes/noteRouter");
const controllers = require("./src/controllers/notes");

const PORT = process.env.PORT || 5000;

const app = express();
const server = require('http').createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(cors())
app.use(logger('dev'))

app.use("/api", routes);

// socket.io setup
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('updateNote', async (data) => {
        try {
            const { id, noteData } = data;
            // Call the updateNote function to handle the update
            const updatedNote = await controllers.updateNote(id, noteData);
            socket.emit('noteUpdated', updatedNote);
        } catch (error) {
            console.error(error);
            socket.emit('error', error.message);
        }
    });
});


app.listen(PORT, () => {
    console.log(`Notefy server on port ${PORT}`)
});
