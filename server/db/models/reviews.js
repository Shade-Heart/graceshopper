const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  content: {
    type: Sequelize.STRING,
    validate: {
      len: {
        min: 20,
        max: 1000
      }
    }
  }
})

module.exports = Review
