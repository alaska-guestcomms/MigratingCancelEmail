import fs from 'fs';
import { sendEmail } from './sendEmail';
import { secrets } from './secrets';
import { addRecipients } from './addRecipients';

export const sendEmailCallback = (path: string): void => {
    var contents = fs.readFileSync(path, 'utf8');
    contents = addRecipients(contents, secrets.recipients);
    sendEmail(contents);
}