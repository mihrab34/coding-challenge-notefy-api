require('dotenv').config();

const cors = require("cors");
const express = require("express");
const logger = require('morgan');
const http = require('http');
const { Server } = require('socket.io');
const routes = require("./src/routes/noteRouter");
const controllers = require("./src/controllers/notes");

const PORT = process.env.PORT || 5000;
console.log('Node environment:', process.env.NODE_ENV);
const app = express();
const server = http.createServer(app);


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())
app.use(logger('dev'))

app.use("/api", routes);


server.listen(PORT, () => console.log(`Notefy server on port ${PORT}`));
