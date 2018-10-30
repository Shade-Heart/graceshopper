const Sequelize = require('sequelize')
const db = require('../db')

const Hats = db.define('hats', {
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
      type: Sequelize.NUMBER
        //TODO: Add hook or validator for decimals places
  },
  quantity: {
      type: Sequelize.NUMBER
      // TODO: Validate Not Empty
  },
  category: {
      type: Sequelize.STRING,
      allowNull: false
  },
  productImg: {
    type: Sequelize.STRING,
    defaultValue: ""
    //TODO: Have a default photo
  },
  size: {
      type: Sequelize.STRING,
      allowNull: false
  }

})

module.exports = Hats