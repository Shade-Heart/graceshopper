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
      type: Sequelize.NUMBER,
      defaultValue: 0.00
  },
  quantity: {
      type: Sequelize.NUMBER,
      defaultValue: 0
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

Hats.hook('beforeValidate',(hats) => {
    hats.name = hats.name.charAt(0).toUpperCase() + hats.name.slice(1)
  })

Hats.hook('beforeValidate',(hats) => {
    hats.price = parseFloat(Math.round(hats.price * 100) / 100).toFixed(2)
})

// Campuses.hook('beforeValidate',(campuses) => {
//     campuses.name = campuses.name.charAt(0).toUpperCase() + campuses.name.slice(1)
//   })

module.exports = Hats