const { article } = require('../../data/db')

mockData = [
  { id: 1, name: 'Télé' },
  { id: 2, name: 'iPhone' },
  { id: 3, name: 'Mac' },
  { id: 4, name: 'gsm' }
]

module.exports = {
  up: () => {
    article.splice(0)
    article.push.apply(article, mockData)
  },

  down: () => {
    article.splice(0)
  }
}