const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/hats', require('./hats'))
router.use('/reviews', require('./reviews'))
router.use('/orders', require('./orders'))
router.use('/order-hat', require('./order-hat'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
