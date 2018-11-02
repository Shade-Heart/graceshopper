const router = require('express').Router()
const {OrderHat} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    console.log(req.session)
    const hats = await OrderHat.findAll({
      include: [{all: true}]
    })
    res.json(hats)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const oneOrder = await OrderHat.findById(req.params.id, {
      include: [{all: true}]
    })
    res.json(oneOrder)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newOrder = await OrderHat.create(req.body)
    res.status(201).json(newOrder)
  } catch (err) {
    next(err)
  }
})

module.exports = router
