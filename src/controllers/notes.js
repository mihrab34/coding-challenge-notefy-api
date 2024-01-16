const {Note} = require("../../models");

const createNote = async(req, res) => {
    try {
        // Convert title to lowercase
        req.body.title = req.body.title.toLowerCase();

        const note = await Note.create(req.body)
        return res.status(201).json({
            note,
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ error: 'Note title must be unique' });
          } else {
            return res.status(500).json({ error: error.message });
          }
    }
    
};

const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.findAll({})
        if(notes) {
            return res.status(200).json( {notes} );
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = {
    createNote,
    getAllNotes
}