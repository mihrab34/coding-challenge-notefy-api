const { Router } = require('express');
const controllers = require('../controllers/notes');
const router = Router();

router.get("/", (req, res) => res.send("Hello World!"));
router.post("/", controllers.createNote);
router.get("/notes", controllers.getAllNotes);

module.exports = router;