const express = require('express')
const router = express.Router()
const BadRequestError = require('../errors/bad-request')
const HttpError = require('../errors/http-error')
const { find } = require('lodash')


router.get('/', (req, res, next) => {
    return next(res.status(500), new HttpError())
})
router.get('/400', (req, res, next) => {
    res.status(400)
    return next(new BadRequestError())
})

module.exports = router