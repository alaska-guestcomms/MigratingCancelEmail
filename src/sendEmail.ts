import { secrets } from './secrets';
import fetch, { Request } from 'node-fetch';

const searchParams = (params: IDictionary<string>) => Object.keys(params).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
}).join('&');

var authRequest = new Request(secrets.authUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: searchParams(secrets.authenticateCredential)
});

interface IDictionary<TValue> {
    [id: string]: TValue;
}

export const sendEmail = (contents: string) => {
    fetch(authRequest)
    .then((response: any) => response.json())
    .then((json: any) => {
        var cancelEmailRequest = new Request(`${json.endPoint + secrets.cancelEmailPath}`,
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
    .then((json: any) => console.log(JSON.stringify(json, null, 2)));
}