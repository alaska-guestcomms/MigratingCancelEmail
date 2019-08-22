import { readFileSync, writeFileSync } from "fs";
import { readFilesRecursive } from './readFilesRecursive';
import { sendEmailCallback } from './sendEmailCallback';
require('dotenv').config();

const MODE = {
    EMAILSENDER: "EmailSender",
    CONFIRMATIONLETTERDATAMAPPING: "ConfirmationLetterDataMapping"
}

var currentMode = MODE.CONFIRMATIONLETTERDATAMAPPING

if (currentMode === MODE.CONFIRMATIONLETTERDATAMAPPING)
{
    var originalSchemaFileName = './ResponsysRequests/ConfirmationLetterMigration/OriginalSchema.json';
    var payloadFileName = './ResponsysRequests/ConfirmationLetterMigration/DataMapping.json';
    var compose = true;
    if (compose) {
        let dataMappingJson = JSON.parse(readFileSync(originalSchemaFileName, 'utf8'));
        RemoveAllComments(dataMappingJson, "comment");
        let payloadJson = JSON.parse(readFileSync(payloadFileName, 'utf8'));
    
        Object.keys(dataMappingJson).forEach((key: string) => {
            let foundIdx = payloadJson.mergeTriggerRecordData.mergeTriggerRecords[0].optionalData.findIndex((data: any) => data.name === key);
            let newNameValuePair = { "name": key, "value": JSON.stringify(dataMappingJson[key]) }
            if (foundIdx > 0) {
                console.log(`${key} is found.`);
                payloadJson.mergeTriggerRecordData.mergeTriggerRecords[0].optionalData[foundIdx] = newNameValuePair;
            }
            else {
                console.log(`${key} is NOT found.`)
                payloadJson.mergeTriggerRecordData.mergeTriggerRecords[0].optionalData.push(newNameValuePair);
            }
        });

        writeFileSync(payloadFileName, JSON.stringify(payloadJson, null, 4));
    } else {
        let payloadJson = JSON.parse(readFileSync(payloadFileName, 'utf8'));
        let dataMappingJson: any = {};
        
        payloadJson.mergeTriggerRecordData.mergeTriggerRecords[0].optionalData.forEach((optional: any, idx: number) => {
            if (idx > 4){
                dataMappingJson[optional.name] = JSON.parse(optional.value)
            }
        });
        console.log(JSON.stringify(dataMappingJson, null, 4));
        //writeFileSync(dataMappingFileName, JSON.stringify(dataMappingJson, null, 4));
    }
}
else if (currentMode === MODE.EMAILSENDER) {
    readFilesRecursive('./ResponsysRequests/CancelEmail', sendEmailCallback);
}

function RemoveAllComments(obj : any, propNameToDelete: string){
    for (let prop in obj)
    {
        if (obj.hasOwnProperty(prop))
        {
            if (typeof obj[prop] === 'object')
                RemoveAllComments(obj[prop], propNameToDelete);
            else {
                if (prop.includes(propNameToDelete))
                    delete obj[prop];                
            }
        }
    }
}