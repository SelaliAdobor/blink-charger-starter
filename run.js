require('dotenv').config()
let api = require('./api.js')

api.getSessionId().then(sessionId =>
    api.authenticateSession(sessionId)
    .then(() => api.getChargerCode(sessionId))
    .then((code) => api.startCharger(sessionId, code))
).then(console.log)