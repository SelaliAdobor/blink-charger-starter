require('dotenv').config()
let api = require('./api.js')

api.getSessionId().then(sessionId =>
    api.authenticateSession(sessionId)
    .then(() => api.getChargerCode(sessionId))
).then(console.log)