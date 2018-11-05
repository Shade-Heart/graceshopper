const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Hat = db.model('hats')
const agent = require('supertest')(app)

describe('Hats routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/hats/', () => {
    const newHatName = 'New hat'
    const newHatDescription = ' a new hat'
    const newHatcategory = ' stylish'
    const newHatSize = 'M'
    const newHatQuantity = 1

    beforeEach(() => {
      return Hat.create({
        name: newHatName,
        description: newHatDescription,
        category: newHatcategory,
        size: newHatSize,
        quantity: newHatQuantity
      })
    })

    xit('a get request should get all hats', async () => {
      const res = await request(app)
        .get('/api/hats')
        .expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(newHatName)
      expect(res.body[0].description).to.be.equal(newHatDescription)
      expect(res.body[0].category).to.be.equal(newHatcategory)
      expect(res.body[0].quantity).to.be.equal(newHatQuantity)
    })

    it('a post request should return unauthorized', async () => {
      const res = await agent.post('/api/hats').send({
        name: 'Second Hat',
        description: 'the second hat',
        category: newHatcategory,
        size: newHatSize,
        quantity: newHatQuantity
      })
      expect(401)
    })

    it('a request to a specific hat should return it', async () => {
      const res = await agent.get('/api/hats/1').expect(200)
      expect(res.body.name).to.be.equal(newHatName)
    })
  })
})
