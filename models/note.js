'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const Note = sequelize.define('Note', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      body: DataTypes.TEXT,
    }) 
  return Note;
};