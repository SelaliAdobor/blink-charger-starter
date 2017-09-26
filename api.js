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
                reject("Failed authenticate session, response: " + JSON.stringify(response))
            }
        })
        .error(reject)
})

getChargerCode = (sessionId) => new Promise((resolve, reject) => {
    let options = {
        json: true,
        body: {
            "snm": false
        }
    };

    let getChargerCodeEndpoint = process.env.API_ROOT + `/users/blinkcode/issueCode?sessionId=${sessionId}&version=2.0`

    request
        .post(getChargerCodeEndpoint, options)
        .then(response => {
            let code = response["blinkCode"]["code"];
            if (code) {
                resolve(code);
            } else {
                reject("Failed get charger code, response: " + JSON.stringify(response))
            }
        })
        .error(reject)
})


module.exports.getSessionId = getSessionId;
module.exports.authenticateSession = authenticateSession;
module.exports.getChargerCode = getChargerCode;