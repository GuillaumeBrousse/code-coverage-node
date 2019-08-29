const request = require("supertest");
require("chai").should();

const app = require("../../app");

describe("Errors", () => {
  describe("when route does not exist", () => {
    it("should return a 404", () => {
      return request(app)
        .get("/i-know-this-path-doesn-exist")
        .then(res => {
          res.status.should.equal(404);
          res.body.should.eql({
            error: {
              code: "NOT_FOUND",
              message: "Page not found"
            }
          });
        });
    });

    it("should return a 500", () => {
      return request(app)
        .get("/errors")
        .then(res => {
          res.status.should.equal(500);
          res.body.should.eql({
            error: {
              code: "ServerError",
              message: "Unknown error occured"
            }
          });
        });
    });

    it("should return a 400", () => {
      return request(app)
        .get("/errors/400")
        .then(res => {
          res.status.should.equal(400);
          res.body.should.eql({
            error: {
              code: "BadRequest",
              message: "Something is wrong with the request"
            }
          });
        });
    });
  });
});
