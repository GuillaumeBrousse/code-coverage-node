const request = require('supertest')
const chai = require('chai')
const expect = chai.expect
chai.should()


const { find } = require('lodash')

const db = require('../../data/db')
const app = require('../../app')

const courseListFixture = require('../fixtures/courseList')

describe('CourselistController', () => {
  beforeEach(() => { courseListFixture.up() })
  afterEach(() => { courseListFixture.down() })

  describe('GL-1 done', () => {
    describe('When I create a courseList (POST /course-lists)', () => {
      it('should reject with a 400 when no name is given', () => {
        return request(app).post('/course-lists').then((res) => {
          res.status.should.equal(400)
          res.body.should.eql({
            error: {
              code: 'VALIDATION',
              message: 'Missing name'
            }
          })
        })
      })

      it('should reject when name is not unique', () => {
        return request(app)
          .post('/course-lists')
          .send({ name: 'Toto' })
          .then((res) => {
            res.status.should.equal(400)
            res.body.should.eql({
              error: {
                code: 'VALIDATION',
                message: 'Name should be unique'
              }
            })
        })
      })

      it('should  succesfuly create a courseList', () => {
        const mockName = 'My New List'

        return request(app)
          .post('/course-lists')
          .send({ name: mockName })
          .then((res) => {
            res.status.should.equal(200)
            expect(res.body.data).to.be.an('object')
            res.body.data.name.should.equal(mockName)

            const result = find(db.courseList, { name: mockName } )
            result.should.not.be.empty
            result.should.eql({
              id: res.body.data.id,
              name: res.body.data.name
            })
          })
      })
    })
  })

  describe('GL-2 done', () => {
    describe('When I delete a courseList (Delete /course-lists/delete/:id)', () => {
      xit('should reject with a 400 when no id is given', () => {
        return request(app)
            .delete('/course-lists/delete/')
            .then((res) => {
                res.status.should.equal(400)
                res.body.should.eql({
                    error: {
                        code: 'VALIDATION',
                        message: 'Missing id'
                    }
                })
            })
      })
      it('should succesfuly delete a courseList', () => {
        const Id = 1
        return request(app)
          .del('/course-lists/delete/'+Id)
          .then((res) => {
            res.status.should.equal(200)
            const result = find(db.courseList, {id: Id })
            if(result){
              result.should.not.exist
            }
          })
      })
    })
  })

  describe('GL-3 done', () => {
    describe('When I nedd all courseList (GET /course-lists)', () => {
      it('should  succesfuly list all courseList', () => {
        return request(app)
          .get('/course-lists')
          .then((res) => {
            res.status.should.equal(200)
            const result = find(db.courseList)
            result.should.not.be.empty
            res.body.data.should.eql(result)
          })
      })
    })
  })

  describe('GL-4 done', () => {
    describe('When I need all articles of courseList (GET /course-lists/:id/articles)', () => {
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
