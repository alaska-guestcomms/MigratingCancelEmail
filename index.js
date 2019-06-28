const testFolders = [ './ResponsysRequests/', './ResponsysRequests/RefundRVWithMiles/'];
const fs = require('fs');
const fetch = require('node-fetch');
const sendEmail = require('./source/sendEmail');

const secrets = {
    authenticateCredential: {
        user_name: '',
        password: '',
        auth_type: '',
    },
    authUrl:'',
    cancelEmailPath: '',
    recipients: []
};

const addRecipients = (contents, recipients) => {
    var customerID = 12345;
    var jsonContents = JSON.parse(contents);
    var firstObj = jsonContents.mergeTriggerRecordData.mergeTriggerRecords.pop();

    recipients.forEach(recipient => {
        var clonedObj = JSON.parse(JSON.stringify(firstObj));
        clonedObj.fieldValues[0] = recipient;
        customerID = customerID + 1;
        clonedObj.fieldValues[1] = customerID.toString();
        jsonContents.mergeTriggerRecordData.mergeTriggerRecords.push(clonedObj);
    });
    
    return JSON.stringify(jsonContents);
}

testFolders.forEach(folder => {
    fs.readdir(folder, (err, files) => {
        files.forEach(file => {
            const path = folder + file;
            if (!fs.lstatSync(path).isDirectory()) {
                var contents = fs.readFileSync(folder + file, 'utf8');
                var contents = addRecipients(contents, secrets.recipients);
                sendEmail(contents);
            }
        });
    });
});
