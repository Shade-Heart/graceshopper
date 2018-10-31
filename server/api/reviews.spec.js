const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Review = db.model('review')
const agent = require('supertest')(app)

describe('Hats routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/reviews/', () => {
    const dummyContent1 = 'this is a dummy review. Does it work?'
    const dummyContent2 =
      'this is the second dummy review, hopefully successful'

    beforeEach(() => {
      return Review.bulkCreate([
        {content: dummyContent1},
        {content: dummyContent2}
      ])
    })

    it('a get request should get all the reviews', async () => {
      const res = await request(app).get('/api/reviews')
      expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body[0].content).to.be.equal(dummyContent1)
      expect(res.body[1].content).to.be.equal(dummyContent2)
    })
    it('a post request should add a review to the database', async () => {
      const res = await agent.post('/api/reviews').send({
        content: 'a third review'
      })
      expect(201)
      const createdReview = await Review.findById(res.body.id)
      expect(createdReview.content).to.be.equal('a third review')
    })
    it('a request for a specific review should return it', async () => {
      const res = await request(app).get('/api/reviews/1')
      expect(200)
      expect(res.body.content).to.be.equal(dummyContent1)
    })
  })
})
