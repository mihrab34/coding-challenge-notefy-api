const {Note} = require("../../models");

const createNote = async(req, res) => {
    try {
        const note = await Note.create(req.body)
        return res.status(201).json({
            note,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
    
};

module.exports = {
    createNote
}