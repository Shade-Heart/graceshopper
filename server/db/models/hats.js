const Sequelize = require('sequelize')
const db = require('../db')

const Hat = db.define('hats', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  },
  productImg: {
    type: Sequelize.STRING,
    defaultValue: './DefaultHat.jpg'
  },
  size: {
    type: Sequelize.STRING,
    defaultValue: 'One Size',
    allowNull: false
  }
})

Hat.hook('beforeValidate', hats => {
  hats.name = hats.name.charAt(0).toUpperCase() + hats.name.slice(1)
})

module.exports = Hat
