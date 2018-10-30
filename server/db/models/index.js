const User = require('./user')
const Review = require('./reviews')
const Hat = require('./hats')
const Order = require('./orders')

Review.belongsTo(User, { as: "user" })
Review.belongsTo(Hat, {as: 'hat'})
User.hasMany(Hat, {as: 'owner'})
Hat.hasMany(Review, {as: 'review'})
Order.belongsTo(User, { as: "user" })

module.exports = {
  User,
  Hat,
  Review,
  Order
}
