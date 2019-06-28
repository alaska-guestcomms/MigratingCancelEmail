export {};

require('dotenv').config();
const readFilesRecursive = require('./readFilesRecursive');
const sendEmailCallback = require('./sendEmailCallback');

readFilesRecursive('./ResponsysRequests/CancelEmail', sendEmailCallback);
