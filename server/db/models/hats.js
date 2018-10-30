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
    type: Sequelize.DECIMAL,
    defaultValue: 0.0
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
    type: Sequelize.ENUM('S', 'M', 'L'),
    allowNull: false
  }
})

Hat.hook('beforeValidate', hats => {
  hats.name = hats.name.charAt(0).toUpperCase() + hats.name.slice(1)
})

Hat.hook('beforeValidate', hats => {
  hats.price = parseFloat(Math.round(hats.price * 100) / 100).toFixed(2)
})

module.exports = Hat
