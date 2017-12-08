const express = require('express')
const router = express.Router()
const BadRequestError = require('../errors/bad-request')
const NotFoundError = require('../errors/not-found')
const { find } = require('lodash')
const { each } = require('lodash')


const db = require('../data/db')
const courseListCollection = db.courseList

router.get('/:id?', (req, res, next) => {
  if (!req.params.id) {
    return next(new NotFoundError('VALIDATION', 'No id is given id'))
  }

  const list_Id = +req.params.id
  const result = find(courseListCollection, { id: list_Id })

	if (result === undefined) {
		return next(new NotFoundError('VALIDATION', 'courseList with id '+list_Id+' not found'))
	}

  res.json({
    id: result.id,
    data: result.articles
  })

})

router.patch('/flag/:id?', (req, res, next) => {
  if (!req.params.id) {
    return next(new NotFoundError('VALIDATION', 'No id is given'))
  }

  const article_id = +req.params.id

  var the_article = false
  var currList =find(courseListCollection)
       each(currList, (articles) => {
          each(articles, (article) => {
            if(article.id === article_id)
              the_article =  article
          })
       })
	if (!the_article) {
		return next(new NotFoundError('VALIDATION', 'article with id '+article_id+' not found'))
  }
  

  res.json({
    id: the_article.id,
    data: the_article
  })

})

module.exports = router