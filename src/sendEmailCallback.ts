export {};
const fs = require('fs');
const fetch = require('node-fetch');
const sendEmail = require('./sendEmail');
const secrets = require('./secrets');
const addRecipients = require('./addRecipients');


const sendEmailCallback = (path: string): void => {
    var contents = fs.readFileSync(path, 'utf8');
    contents = addRecipients(contents, secrets.recipients);
    sendEmail(contents);
}

module.exports = sendEmailCallback;