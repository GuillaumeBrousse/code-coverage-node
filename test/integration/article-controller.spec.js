const request = require("supertest");
const chai = require("chai");
const _ = require("lodash");
const expect = chai.expect;
chai.should();

const { find } = require("lodash");

const db = require("../../data/db");
const app = require("../../app");

const courseListFixture = require("../fixtures/courseList");

describe("ArticleController", () => {
  beforeEach(() => {
    courseListFixture.up();
  });
  afterEach(() => {
    courseListFixture.down();
  });

  describe("GL-4", () => {
    describe("When I need add article in a courseList (POST /course-lists/articles/:id)", () => {
      it("should reject with a 404 when no courselist id is given", () => {
        return request(app)
          .post("/course-lists/articles/")
          .then(res => {
            res.status.should.equal(404);
            res.body.should.eql({
              error: {
                code: "VALIDATION",
                message: "No id is given"
              }
            });
          });
      });

      it("should reject with a 400 when no name is given for article", () => {
        const list_Id = 1;
        return request(app)
          .post("/course-lists/articles/" + list_Id)
          .then(res => {
            res.status.should.equal(400);
            res.body.should.eql({
              error: {
                code: "VALIDATION",
                message: "Missing name"
              }
            });
          });
      });

      it("should reject when articleName is not unique", () => {
        const list_Id = 1;
        const articleName = "iPhone X";
        return request(app)
          .post("/course-lists/articles/" + list_Id)
          .send({ name: articleName })
          .then(res => {
            res.status.should.equal(400);
            res.body.should.eql({
              error: {
                code: "VALIDATION",
                message: "Name should be unique"
              }
            });
          });
      });

      it("should  succesfuly create an article in courselist", () => {
        const list_Id = 1;
        const articleName = "pizza";
        return request(app)
          .post("/course-lists/articles/" + list_Id)
          .send({ name: articleName })
          .then(res => {
            res.status.should.equal(200);
            expect(res.body.data).to.be.an("object");
            res.body.data.itemName.should.equal(articleName);

            const result = find(db.courseList, { id: list_Id });
            result.articles.should.not.be.empty;
            find(result.articles, { id: res.body.id }).should.not.be.empty;
            find(result.articles, { itemName: articleName }).should.not.be
              .empty;
          });
      });
    });
  });

  describe("GL-5", () => {
    describe("When I need all articles of courseList (GET /course-lists/articles/:id)", () => {
      it("should reject with a 404 when no id is given", () => {
        return request(app)
          .get("/course-lists/articles/")
          .then(res => {
            res.status.should.equal(404);
            res.body.should.eql({
              error: {
                code: "VALIDATION",
                message: "No id is given id"
              }
            });
          });
      });

      it("should reject with 404 when courseList id is not found", () => {
        const list_Id = 0;
        return request(app)
          .get("/course-lists/articles/" + list_Id)
          .then(res => {
            res.status.should.equal(404);
            res.body.should.eql({
              error: {
                code: "VALIDATION",
                message: "courseList with id " + list_Id + " not found"
              }
            });
          });
      });

      it("should succesfuly list all articles in courseList", () => {
        const list_Id = 1;
        return request(app)
          .get("/course-lists/articles/" + list_Id)
          .then(res => {
            res.status.should.equal(200);
            expect(res.body.data).to.be.an("array");
            res.body.id.should.equal(list_Id);

            const result = find(db.courseList, { id: list_Id });
            result.should.not.be.empty;
            result.id.should.equal(res.body.id);
            result.articles.should.eql(res.body.data);
          });
      });
    });
  });

  describe("GL-6", () => {
    describe("When I need flag an article of a courseList (PATCH /course-lists/articles/flag/:listId/:articleId)", () => {
      it("should reject with a 404 when no courseList id is given", () => {
        return request(app)
          .patch("/course-lists/articles/flag/")
          .then(res => {
            res.status.should.equal(404);
            res.body.should.eql({
              error: {
                code: "VALIDATION",
                message: "No courseList id is given"
              }
            });
          });
      });

      it("should reject with a 404 when no  article id is given", () => {
        const list_id = 1;
        return request(app)
          .patch("/course-lists/articles/flag/" + list_id)
          .then(res => {
            res.status.should.equal(404);
            res.body.should.eql({
              error: {
                code: "VALIDATION",
                message: "No article id is given"
              }
            });
          });
      });

      it("should reject with 404 when courseList id is not found", () => {
        const list_id = 0;
        const article_id = 2;
        return request(app)
          .patch("/course-lists/articles/flag/" + list_id + "/" + article_id)
          .then(res => {
            res.status.should.equal(404);
            res.body.should.eql({
              error: {
                code: "VALIDATION",
                message: "courseList with id " + list_id + " not found"
              }
            });
          });
      });

      it("should reject with 404 when article id is not found", () => {
        const list_id = 1;
        const article_id = 0;
        return request(app)
          .patch("/course-lists/articles/flag/" + list_id + "/" + article_id)
          .then(res => {
            res.status.should.equal(404);
            res.body.should.eql({
              error: {
                code: "VALIDATION",
                message: "article with id " + article_id + " not found"
              }
            });
          });
      });

      it("should succesful find and flag the article ", () => {
        const list_id = 1;
        const article_id = 1;
        return request(app)
          .patch("/course-lists/articles/flag/" + list_id + "/" + article_id)
          .then(res => {
            res.status.should.equal(200);
            expect(res.body.data).to.be.an("object");
            res.body.id.should.equal(list_id);

            const result = find(db.courseList, { id: list_id });
            result.articles.should.not.be.empty;
            const article = find(result.articles, { id: res.body.id });
            article.should.not.be.empty;
            res.body.data.should.eql(article);
            article.flag.should.equal(true);
          });
      });
    });
  });
});
