'use strict'

const db = require('../server/db')
const {User, Hat} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Haiau',
      lastName: 'Duong',
      email: 'hd@email.com',
      password: '123',
      isAdmin: true
    }),
    User.create({
      firstName: 'Jimmy',
      lastName: 'Huang',
      email: 'jh@email.com',
      password: '123'
    })
  ])
  const hats = await Promise.all([
    Hat.create({
      name: 'SnapBack',
      description: 'A Hipster Kind of Head Wear',
      price: 500,
      quantity: 10,
      category: 'Hipster',
      size: 'S'
    }),
    Hat.create({
      name: 'Cowboy',
      description: 'Get Ready to Round up the Cattle',
      price: 1000,
      quantity: 5,
      category: 'Rancher',
      size: 'M'
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${hats.length} hats`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
