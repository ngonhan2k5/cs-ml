const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'components')],
  },

  env: {
    host: '104.154.17.226'
  },
}