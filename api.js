let request = require('request-promise');

const getSessionEndpoint = process.env.API_ROOT + "getSession?platform=android&version=2.0"

getSessionId = () => new Promise((resolve, reject) => {
    let options = {
        json: true
    };
    request
        .get(getSessionEndpoint, options)
        .then(response => {
            let sessionId = response["sessionId"];
            if (sessionId) {
                resolve(response["sessionId"]);
            } else {
                reject("Failed to get session id from response: " + response)
            }
        })
        .error(reject)
})
module.exports.getSessionId = getSessionId;