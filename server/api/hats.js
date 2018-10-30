const router = require('express').Router()
const {Hat} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const hats = await Hat.findAll({
      include: [{all: true}]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const hats = await Hat.findAll({
      include: [{all: true}]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const oneHat = await Hat.findById(req.params.id, {
      include: [{all: true}]
    })
    res.json(oneHat)
  } catch (err) {
    next(err)
  }
})
