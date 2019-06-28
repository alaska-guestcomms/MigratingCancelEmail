export {};

const testFolders = [ 
    //'./ResponsysRequests/',
    './ResponsysRequests/RefundRVWithMiles/'
];
const fs = require('fs');
const fetch = require('node-fetch');
const sendEmail = require('./sendEmail');
const secrets = require('./secrets');
const addRecipients = require('./addRecipients');

testFolders.forEach(folder => {
    fs.readdir(folder, (err: any, files: string[]): void => {
        console.log(folder);
        try {
            files.forEach((file: any): void => {
                const path = folder + file;
                if (!fs.lstatSync(path).isDirectory()) {
                    var contents = fs.readFileSync(folder + file, 'utf8');
                    var contents = addRecipients(contents, secrets.recipients);
                    sendEmail(contents);
                    console.log(path);
                }
            });
        }
        catch (e)
        {
            console.log(e);
        }
    });
});
