export {};
const secrets = require('./secrets');
const fetch = require('node-fetch');

const searchParams = (params: any) => Object.keys(params).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
}).join('&');

const sendEmail = (contents: any) => {
var authRequest = new fetch.Request(secrets.authUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: searchParams(secrets.authenticateCredential)
});

fetch(authRequest)
    .then((response: any) => response.json())
    .then((json: any) => {
        var cancelEmailRequest = new fetch.Request(`${json.endPoint + secrets.cancelEmailPath}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': json.authToken
                },
                body: `${contents}`
            });
        return fetch(cancelEmailRequest);
        })
        .then((response: any) => response.json())
        .then((json: any) => console.log(json));
}

module.exports = sendEmail;