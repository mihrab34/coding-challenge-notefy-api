const express = require("express");
const app = express();
const PORT = 5000;
const routes = require("./src/routes/noteRouter");

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Hello World!");
});


app.listen(PORT, () => {
    console.log(`Notefy server on port ${PORT}`)
});