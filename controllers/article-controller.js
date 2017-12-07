const express = require('express')
const router = express.Router()
const BadRequestError = require('../errors/bad-request')
const NotFoundError = require('../errors/not-found')
const { find } = require('lodash')

const db = require('../data/db')
const courseListCollection = db.courseList

router.get('/:id?', (req, res, next) => {
  if (!req.params.id) {
    return next(new NotFoundError('NOT_FOUND', 'No id is given id'))
  }

  const list_Id = req.params.id
  const result = find(courseListCollection, { id : list_Id })

	if (result === undefined) {
		return next(new NotFoundError('NOT_FOUND', 'courseList with id '+list_Id+' not found'))
	}

  res.json({
    id: result.id,
    data: result.article
  })
  
})

module.exports = router