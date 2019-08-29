const express = require("express");
const router = express.Router();
const BadRequestError = require("../errors/bad-request");
const NotFoundError = require("../errors/not-found");
const { find } = require("lodash");

const db = require("../data/db");
const courseListCollection = db.courseList;

router.get("/:id?", (req, res, next) => {
  if (!req.params.id) {
    return next(new NotFoundError("VALIDATION", "No id is given id"));
  }

  const list_Id = +req.params.id;
  const result = find(courseListCollection, { id: list_Id });

  if (result === undefined) {
    return next(
      new NotFoundError(
        "VALIDATION",
        "courseList with id " + list_Id + " not found"
      )
    );
  }

  res.json({
    id: result.id,
    data: result.articles
  });
});

router.post("/:id?", (req, res, next) => {
  if (!req.params.id) {
    return next(new NotFoundError("VALIDATION", "No id is given"));
  }

  if (!req.body.name) {
    return next(new BadRequestError("VALIDATION", "Missing name"));
  }

  const list_Id = +req.params.id;
  const articleName = req.body.name;

  //get courseList
  const result = find(courseListCollection, { id: list_Id });

  // Check for name uniqueness
  const checkArticle = find(result.articles, { itemName: articleName });
  if (checkArticle) {
    return next(new BadRequestError("VALIDATION", "Name should be unique"));
  }

  const newArticle = {
    id: result.articles.length + 1,
    itemName: articleName,
    flag: false
  };
  result.articles.push(newArticle);

  res.json({
    id: newArticle.id,
    data: newArticle
  });
});

router.patch("/flag/:listId?/:articleId?", (req, res, next) => {
  if (!req.params.listId) {
    return next(new NotFoundError("VALIDATION", "No courseList id is given"));
  }
  if (!req.params.articleId) {
    return next(new NotFoundError("VALIDATION", "No article id is given"));
  }

  const list_id = +req.params.listId;
  const article_id = +req.params.articleId;

  //find courseList id
  const currList = find(courseListCollection, { id: list_id });
  if (currList === undefined) {
    return next(
      new NotFoundError(
        "VALIDATION",
        "courseList with id " + list_id + " not found"
      )
    );
  }

  //find article id
  const the_article = find(currList.articles, { id: article_id });
  if (the_article === undefined) {
    return next(
      new NotFoundError(
        "VALIDATION",
        "article with id " + article_id + " not found"
      )
    );
  }

  the_article.flag = true;

  res.json({
    id: the_article.id,
    data: the_article
  });
});

module.exports = router;
