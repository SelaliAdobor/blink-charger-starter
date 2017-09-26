require('dotenv').config()
let api = require('./api.js')

api.getSessionId().then(console.log)