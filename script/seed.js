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
    }),
    User.create({
      firstName: 'Frank',
      lastName: 'Malafronte',
      email: 'fm@email.com',
      password: '123',
      isAdmin: true
    }),
    User.create({
      firstName: 'Paola',
      lastName: 'Neira',
      email: 'pn@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Joe ',
      lastName: 'Shmoe',
      email: 'js@email.com',
      password: '123'
    })
  ])

  const hats = await Promise.all([
    Hat.create({
      name: 'Supreme Snapback',
      description: 'A Hipster Kind of Head Wear',
      price: 520,
      quantity: 21,
      category: 'Hipster',
      size: 'One Size'
    }),
    Hat.create({
      name: 'Oversized Cowboy Hat',
      description: 'Get Ready to Round up the Cattle',
      price: 1050,
      quantity: 65,
      category: 'Rancher',
      size: 'One Size'
    }),
    Hat.create({
      name: 'Outback Australian Oilskin Hat',
      description:
        'Protects the head and neck from sun, rain and snow. Waterproof and breathable 100% button with UPF Rating of 50',
      price: 2152,
      quantity: 5,
      category: 'Rancher',
      size: 'One Size'
    }),
    Hat.create({
      name: 'Minnetonka Unisex Fold Up Hat',
      description:
        'Folds in half from center of front to center back and retains original shape',
      price: 1402,
      quantity: 15,
      category: 'Rancher',
      size: 'One Size'
    }),
    Hat.create({
      name: 'Western Express Pinch Front Palm Hat',
      description:
        "Is it a rancher hat if it doesn't have the world Western in it?",
      price: 4921,
      quantity: 24,
      category: 'Rancher',
      size: 'One Size'
    }),
    Hat.create({
      name: 'The Fedora of Fedoras',
      description:
        'The only way to identify yourself as a Redditor without screaming narwhal',
      price: 8525,
      quantity: 25,
      category: 'Hipster',
      size: 'One Size'
    }),
    Hat.create({
      name: 'Stetson Sturgis Crushable Wool Hat',
      description:
        'Use it for hunting or traversing the dark streets of New York City',
      price: 9252,
      quantity: 12,
      category: 'Hipster',
      size: 'One Size'
    }),
    Hat.create({
      name: 'Beret',
      description:
        'A soft round cap, usually of woollen felt, with a bulging flat crown and tight-fitting brimless headband.',
      price: 2502,
      quantity: 12,
      category: 'Hipster',
      size: 'One Size'
    }),
    Hat.create({
      name: 'Tricorne',
      description:
        'A soft hat with a low crown and broad brim, pinned up on either side of the head and at the back, producing a triangular shape. Worn by Europeans in the 18th century.',
      price: 5252,
      quantity: 12,
      category: 'Classy',
      size: 'One Size'
    }),
    Hat.create({
      name: 'Top Hat',
      description:
        'A tall, flat-crowned, cylindrical hat worn by men in the 19th and early 20th centuries, now worn only with morning dress or evening dress.',
      price: 4252,
      quantity: 10,
      category: 'Classy',
      size: 'One Size'
    }),
    Hat.create({
      name: 'Derby Hat',
      description:
        "A hard felt hat with a rounded crown created in 1850 by Lock's of St James's, the hatters to Thomas Coke, 2nd Earl of Leicester, for his servants.",
      price: 6935,
      quantity: 4,
      category: 'Classy',
      size: 'One Size'
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
