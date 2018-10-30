const {db} = require('./server/db')
const {green, red} = require('chalk')

const User = require('./../server/db/models/user')

const UserSeed = require('./UserSeed.js')

const seed = async () => {
  await db.sync({force: true})
  // Seed Users
  await User.bulkCreate(UserSeed)
  console.log(green('Seeding success!'))
  db.close()
}

seed()
  .catch(err => {
    console.error(red('Error Seeding!'))
    console.error(err)
    db.close()
  })