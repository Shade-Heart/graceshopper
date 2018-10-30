const {Review} = require('../db/models/reviews')
const router = require('express').Router()
module.exports = router

router.get('/', async function(req, res, next) {
  try {
    const reviews = await Review.findAll()
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async function(req, res, next) {
  try {
    const review = await Review.findById(req.params.id)
    res.json(review)
  } catch (err) {
    next(err)
  }
})

router.post('/', async function(req, res, next) {
  const review = await Review.create(req.body)
  res.status(201).json(review)
})
