const express = require('express')

function isAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    return next()
  } else {
    console.log('Unauthorized')
    res.sendStatus(401)
  }
}

function isLoggedIn(req, res, next) {
  if (req.user) {
    return next()
  } else {
    console.log('Not Logged In')
    res.sendStatus(401)
  }
}

module.exports = {isAdmin, isLoggedIn}
