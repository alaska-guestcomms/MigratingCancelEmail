export {};
const { Map } = require('immutable');

const addRecipients = (contents: string, recipients: string[]): string => {
    var customerID = 12345;
    var jsonContents = JSON.parse(contents);
    var firstObj = jsonContents.mergeTriggerRecordData.mergeTriggerRecords.pop();
    var immutableObj = Map(firstObj);

    recipients.forEach((recipient: string): void => {
        customerID++;
        var newObj = immutableObj.set('fieldValues', [recipient, customerID.toString(), 'H'])
        jsonContents.mergeTriggerRecordData.mergeTriggerRecords.push(newObj);
    });
    
    return JSON.stringify(jsonContents);
}

module.exports = addRecipients;