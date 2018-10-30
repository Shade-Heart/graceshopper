const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  items: {
    type: Sequelize.ARRAY(Sequelize.JSON),
    allowNull: false,
    // [{productId, price, quantity}, {productId, price, quantity}] - no default value
  }
})

module.exports = Order

  // price: {
  //   type: Sequelize.DECIMAL,
  //   allowNull: false
  // },
  // productId: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false
  // },
  // quantity: {
  //   type: Sequelize.STRING,
  //   allowNull: false,
  //   defaultValue: 0
  // }