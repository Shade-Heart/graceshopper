const User = require('./user')
const Review = require('./reviews')
const Hat = require('./hats')
const Order = require('./orders')
const OrderHat = require('./orderHat')

Review.belongsTo(User)
Review.belongsTo(Hat)
User.hasMany(Hat)
Hat.hasMany(Review)
Order.belongsTo(User)
Order.belongsToMany(Hat, {
  through: {model: OrderHat, unique: false},
  constraints: false
})
Hat.belongsToMany(Order, {
  through: {model: OrderHat, unique: false},
  constraints: false
})

module.exports = {
  User,
  Hat,
  Review,
  Order,
  OrderHat
}
