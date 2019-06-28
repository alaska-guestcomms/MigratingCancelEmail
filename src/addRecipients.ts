const addRecipients = (contents: string, recipients: number[]): any => {
    var customerID = 12345;
    var jsonContents = JSON.parse(contents);
    var firstObj = jsonContents.mergeTriggerRecordData.mergeTriggerRecords.pop();

    recipients.forEach((recipient: number): void => {
        var clonedObj = JSON.parse(JSON.stringify(firstObj));
        clonedObj.fieldValues[0] = recipient;
        customerID = customerID + 1;
        clonedObj.fieldValues[1] = customerID.toString();
        jsonContents.mergeTriggerRecordData.mergeTriggerRecords.push(clonedObj);
    });
    
    return JSON.stringify(jsonContents);
}

module.exports = addRecipients;