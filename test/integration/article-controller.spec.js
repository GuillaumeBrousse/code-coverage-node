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

  describe('GL-4 done', () => {
    describe('When I need all articles of courseList (GET /course-lists/articles/:id)', () => {
      it('should  succesfuly list all articles', () => {
        return request(app)
          .get('/course-lists/articles/2')
          .then((res) => {
            res.status.should.equal(200)
            console.log('tessst')
          })
      })
    })
  })

})
