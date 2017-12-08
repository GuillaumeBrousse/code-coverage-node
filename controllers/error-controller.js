const express = require('express')
const router = express.Router()
const BadRequestError = require('../errors/bad-request')
const HttpError = require('../errors/http-error')
const { find } = require('lodash')


router.get('/500', (req, res, next) => {
    return next(new HttpError())
})
router.get('/400', (req, res, next) => {
    return next(new BadRequestError())
})

module.exports = router