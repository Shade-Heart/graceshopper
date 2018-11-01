const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('PENDING', 'COMPLETED')
  },
  total: {
    type: Sequelize.INTEGER
  },
  date: {
    type: Sequelize.DATE
  }
})

module.exports = Order
