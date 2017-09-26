blink-charger-starter
------------

Starts Blink chargers using their mobile device API.

#Setup
1. Create file at root directory named `.env` with the following contents:


        API_ROOT=< Blink API Endpoint >
        BLINK_ACCOUNT_USERNAME=< Your Blink Username >
        BLINK_ACCOUNT_PASSWORD=< Your Blink Password >
        CHARGER_ID=< Your Charger's ID >

   The "Blink API Endpoint" will usually be "https://prod.blinknetwork.com/api/mobile2/"

2.  Get the charger's ID  for `.env`
    < Instructions coming soon >
#Usage

Run `node run.js` and the charger will be started. If the operation succeeds the message `Success` will be shown, otherwise a stack trace will be produced.

#Credit

Matt "Chicken Dinner" P. for the idea