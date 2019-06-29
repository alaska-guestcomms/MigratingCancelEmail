export {};
const { Map } = require('immutable');
const magicNumber = 12345;

const addRecipients = (contents: string, recipients: string[]): string => {
    var customerID = magicNumber;
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