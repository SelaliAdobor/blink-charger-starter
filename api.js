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
                resolve(sessionId);
            } else {
                reject("Failed to get session id from response: " + response)
            }
        })
        .error(reject)
})

authenticateSession = (sessionId) => new Promise((resolve, reject) => {
    let options = {
        json: true,
        body: {
            "deviceToken": "blink-charger-starter",
            "userName": process.env.BLINK_ACCOUNT_USERNAME,
            "password": process.env.BLINK_ACCOUNT_PASSWORD,
            "sessionId": sessionId,
        }
    };

    let authenticationEndpoint = process.env.API_ROOT + `/auth?sessionId=${sessionId}&version=2.0`

    request
        .post(authenticationEndpoint, options)
        .then(response => {
            let userId = response["userId"];
            if (userId) {
                resolve(userId);
            } else {
                reject("Failed authenticate session, response: " + response)
            }
        })
        .error(reject)
})
module.exports.getSessionId = getSessionId;
module.exports.authenticateSession = authenticateSession;