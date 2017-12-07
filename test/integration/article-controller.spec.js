const request = require('supertest')
const chai = require('chai')
const expect = chai.expect
chai.should()


const { find } = require('lodash')

const db = require('../../data/db')
const app = require('../../app')

const courseListFixture = require('../fixtures/courseList')

describe('ArticleController', () => {

  beforeEach(() => { courseListFixture.up() })
  afterEach(() => { courseListFixture.down() })


  describe('GL-5', () => {
    describe('When I need all articles of courseList (GET /course-lists/articles/:id)', () => {
      it('should reject with a 404 when no id is given', () => {
        return request(app).get('/course-lists/articles/').then((res) => {
          res.status.should.equal(404)
          res.body.should.eql({
            error: {
              code: 'VALIDATION',
              message: 'No id is given id'
            }
          })
        })
      })

      it('should reject with 404 when courseList id is not found', () => {
        const list_Id = 0
        return request(app)
          .get('/course-lists/articles/'+list_Id)
          .then((res) => {
            res.status.should.equal(404)
            res.body.should.eql({
              error: {
                code: 'VALIDATION',
                message: 'courseList with id '+list_Id+' not found'
              }
            })
        })
      })

      it('should succesfuly list all articles in courseList', () => {
        const list_Id = 1
        return request(app)
          .get('/course-lists/articles/'+list_Id)
          .then((res) => {
            res.status.should.equal(200)
            expect(res.body.data).to.be.an('array')
            res.body.id.should.equal(list_Id)

            const result = find(db.courseList, { id: list_Id } )
            result.should.not.be.empty
            result.id.should.equal(res.body.id)
            result.articles.should.eql(res.body.data)
          })
      })
    })

  })

})
