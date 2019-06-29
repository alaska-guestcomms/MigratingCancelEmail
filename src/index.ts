require('dotenv').config();
import { readFilesRecursive } from './readFilesRecursive';
import { sendEmailCallback } from './sendEmailCallback';

readFilesRecursive('./ResponsysRequests/CancelEmail', sendEmailCallback);
