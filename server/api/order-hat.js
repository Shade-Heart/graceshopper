const router = require('express').Router()
const {OrderHat} = require('../db/models')
const {isLoggedIn, isAdmin} = require('./authentication-middleware')

router.get('/', async (req, res, next) => {
  try {
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

router.get('/lineItem/:hatId', async (req, res, next) => {
  try {
    const hatId = req.params.hatId
    const lineItem = await OrderHat.findOne({where: {hatId}})
    res.json(lineItem)
  } catch (err) {
    next(err)
  }
})

router.get('/lineItems/:orderId', async (req, res, next) => {
  try {
    const orderId = req.params.orderId
    const oneOrder = await OrderHat.findAll({
      where: {
        orderId
      },
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

router.put('/lineItems/:orderId/:hatId', async (req, res, next) => {
  try {
    const orderId = req.params.orderId
    const hatId = req.params.hatId
    const lineItem = await OrderHat.findOne({where: {orderId, hatId}})
    const modifiedItem = await lineItem.update({
      quantity: lineItem.quantity + 1
    })
    res.json(modifiedItem)
  } catch (err) {
    next(err)
  }
})

router.delete('/lineItems/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    await OrderHat.destroy({where: {id}})
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

module.exports = router
