const router = require('express').Router()
const {Order} = require('../db/models')
const stripe = require('stripe')('sk_test_BescWFbYN8TQWP24irdmOeDM')
const {isLoggedIn, isAdmin} = require('./authentication-middleware')

router.get('/', async (req, res, next) => {
  try {
    const hats = await Order.findAll({
      include: [{all: true}]
    })
    res.json(hats)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const oneOrder = await Order.findById(req.params.id, {
      include: [{all: true}]
    })
    res.json(oneOrder)
  } catch (err) {
    next(err)
  }
})

router.get('/oid/:oid', async (req, res, next) => {
  try {
    const oid = req.params.oid
    const oneOrder = await Order.findAll({
      where: {
        oid
      },
      include: [{all: true}]
    })
    res.json(oneOrder)
  } catch (err) {
    next(err)
  }
})

router.get('/cart/:uid', async (req, res, next) => {
  try {
    const userId = req.params.uid
    const oneOrder = await Order.findAll({
      where: {
        userId,
        status: 'PENDING'
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
    const [newOrder, wasCreated] = await Order.findOrCreate({
      where: {
        userId: req.body.userId,
        oid: req.body.oid
      }
    })
    res.status(201).json(newOrder)
  } catch (err) {
    next(err)
  }
})

router.post('/charge', async (req, res, next) => {
  try {
    let {status} = await stripe.charges.create(req.body)
    res.status(201).json({status})
  } catch (err) {
    next(err)
  }
})

router.put('/:uid', async (req, res, next) => {
  try {
    const userId = req.params.uid
    const order = await Order.findOne({
      where: {
        userId,
        status: 'PENDING'
      }
    })
    const modifiedItem = await order.update({
      oid: userId
    })
    res.json(modifiedItem)
  } catch (err) {
    next(err)
  }
})

router.put('/status/:orderId/:subtotal', async (req, res, next) => {
  try {
    const orderId = req.params.orderId
    const subtotal = req.params.subtotal
    const order = await Order.findOne({
      where: {
        id: orderId,
        status: 'PENDING'
      }
    })
    const modifiedItem = await order.update({
      status: 'COMPLETED',
      total: subtotal
    })
    res.json(modifiedItem)
  } catch (err) {
    next(err)
  }
})

module.exports = router
