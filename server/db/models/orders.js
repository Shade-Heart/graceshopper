const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  oid: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  status: {
    type: Sequelize.ENUM('PENDING', 'COMPLETED'),
    defaultValue: 'PENDING'
  },
  total: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  date: {
    type: Sequelize.DATE
  }
})

module.exports = Order
