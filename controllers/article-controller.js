const express = require('express')
const router = express.Router()
const BadRequestError = require('../errors/bad-request')
const { find } = require('lodash')

const db = require('../data/db')
const courseListCollection = db.courseList

router.get('/:id', (req, res, next) => {
    console.log('GOOD '+req.params.id)

    console.log()
    res.send('true')
})

module.exports = router