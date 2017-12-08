const { courseList } = require('../../data/db')

mockData = [
  { id: 1, name: 'Apple', articles:[{id: 1, itemName: 'iPhone X', flag: true}, {id: 2,itemName: 'MacBook Pro', flag: false}] },
  { id: 2, name: 'Cadeau noel', articles:[{id: 3, itemName: 'Disque dur', flag: true}] },
  { id: 3, name: 'Anniversaire', articles:[] }
]

module.exports = {
  up: () => {
    courseList.splice(0)
    courseList.push.apply(courseList, mockData)
  },

  down: () => {
    courseList.splice(0)
  }
}