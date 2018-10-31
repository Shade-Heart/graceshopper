const {Review} = require('../db/models')

const router = require('express').Router()

const {isLoggedIn, isAdmin} = require('./authentication-middleware')

module.exports = router

router.get('/', async function(req, res, next) {
  try {
    const reviews = await Review.findAll({
      include: [{all: true}]
    })
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async function(req, res, next) {
  try {
    const review = await Review.findById(req.params.id, {
      include: [{all: true}]
    })
    res.json(review)
  } catch (err) {
    next(err)
  }
})

router.post('/', isAdmin, async function(req, res, next) {
  try {
    const review = await Review.create(req.body, {
      include: [{all: true}]
    })

    res.status(201).json(review)
  } catch (err) {
    next(err)
  }
})
