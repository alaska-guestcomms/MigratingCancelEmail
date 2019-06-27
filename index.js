const testFolders = [ './ResponsysRequests/', './ResponsysRequests/RefundRVWithMiles/'];
const fs = require('fs');
const fetch = require('node-fetch');

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
