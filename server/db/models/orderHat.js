const Sequelize = require('sequelize')
const db = require('../db')

const OrderHat = db.define('order-hats', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = OrderHat
