const { Note } = require("../../models");

// Adds a new note to the Database
const createNote = async (req, res) => {
    try {
        console.log('Received request body:', req.body);  // Add this line

        if (!req.body || typeof req.body !== 'object') {
            return res.status(400).json({ errorMessage: 'Invalid request body' });
        }

        if (!req.body.title || typeof req.body.title !== 'string') {
            return res.status(400).json({ errorMessage: 'Title is required and must be a string' });
        }

        req.body.title = req.body.title.toLowerCase().trim();
        const note = await Note.create(req.body);
        return res.status(201).json({
            message: "Note added successfully",
            note
        });
    } catch (error) {
        console.error('Error creating note:', error);
        return res.status(500).json({ 
            error: 'An error occurred while creating the note',
            details: error.message
        });
    }
};

// Gets all notes from the database
const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.findAll({})
        if (notes) {
            return res.status(200).json({ notes });
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

// Update note based on data sent from the socket.io server
const updateNote = async (res, id, noteData) => {
    try {
        const [updated] = await Note.update(noteData, { where: { id: id } });

        if (updated) {
            const updatedNote = await Note.findOne({ where: { id: id } });
            return res.status(200).json({ updatedNote })
        } else {
            throw new Error('Note not found');
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

// delete notes
const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Note.destroy({
            where: { id: id }
        });
        if (deleted) {
            return res.status(204).send("Note deleted");
        }
        throw new Error("Note not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = {
    createNote,
    getAllNotes,
    updateNote,
    deleteNote
}
