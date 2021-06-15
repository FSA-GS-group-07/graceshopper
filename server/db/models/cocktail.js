const Sequelize = require('sequelize')
const db = require('../db')
const axios = require('axios');


const Cocktail = db.define('cocktail', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Flaming_cocktails.jpg/220px-Flaming_cocktails.jpg'
    },
    ingredients: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 10
    },
    type: {
        type: Sequelize.STRING,
        allowNull: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    }
})

module.exports = Cocktail

