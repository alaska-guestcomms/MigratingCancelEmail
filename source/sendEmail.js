const searchParams = (params) => Object.keys(params).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
}).join('&');

const sendEmail = (contents) => {
var authRequest = new fetch.Request(secrets.authUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: searchParams(secrets.authenticateCredential)
});
fetch(authRequest)
    .then(response => response.json())
    .then(json => {
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
        .then(response => response.json())
        .then(json => console.log(json));
}

module.exports = sendEmail;