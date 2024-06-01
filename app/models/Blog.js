const { DataTypes } = require('sequelize')
const { sequelize } = require('../core/sequelize');

const Blog = sequelize.define('Blog', {
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      text: {
        type: DataTypes.TEXT,
      },
      create_date: {
        type: DataTypes.DATE,
      },
      publish_date: {
        type: DataTypes.DATE,
    }});

module.exports = Blog