const { Note } = require("../../models");

const createNote = async (req, res) => {
    try {
        // Convert title to lowercase
        req.body.title = req.body.title.toLowerCase();

        const note = await Note.create(req.body)
        return res.status(201).json({
            message: "Note added successfully",
            note
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
        if (notes) {
            return res.status(200).json({ notes });
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const updateNote = async (id, noteData) => {
    try {
        const [updated] = await Note.update(noteData,
            { where: { id: id } });
        if (updated) {
            const updatedNote = await Note.findOne({ where: { id: id } });
            return res.status(204).json({
                updatedNote
            })
        } else {
            throw new Error('Note not found');
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

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