const router = require('express').Router()
const {Hat} = require('../db/models')
const {isLoggedIn, isAdmin} = require('./authentication-middleware')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const hats = await Hat.findAll({
      include: [{all: true}]
    })
    res.json(hats)
  } catch (err) {
    next(err)
  }
})

router.post('/', isAdmin, async (req, res, next) => {
  try {
    const newHat = await Hat.create(req.body)
    res.status(201).json(newHat)
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

router.delete('/:id', isAdmin, async (req, res, next) => {
  try {
    const id = req.params.id
    await Hat.destroy({where: {id}})
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

router.put('/:id', isAdmin, async (req, res, next) => {
  try {
    const id = req.params.id
    const hat = await Hat.findById(id)
    const modifiedHat = await hat.update(req.body)
    res.json(modifiedHat)
  } catch (err) {
    next(err)
  }
})
