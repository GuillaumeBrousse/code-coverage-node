const { courseList } = require('../../data/db')

mockData = [
  { id: 1, name: 'Apple', articles:[{itemName: 'iPhone X', flag: true}, {itemName: 'MacBook Pro', flag: false}] },
  { id: 2, name: 'Cadeau noel', articles:[{itemName: 'Disque dur', flag: true}] },
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