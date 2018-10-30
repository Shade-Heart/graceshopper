const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  content: {
    type: Sequelize.TEXT,
    validate: {
      min: [20]
    }
  }
})

module.exports = Review
