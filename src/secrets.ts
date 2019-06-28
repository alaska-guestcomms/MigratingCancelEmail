export {};

const secrets = {
    authenticateCredential: {
        user_name: process.env.user_name,
        password: process.env.password,
        auth_type: process.env.auth_type
    },
    authUrl: process.env.authUrl,
    cancelEmailPath: process.env.cancelEmailPath,
    recipients: process.env.recipients == undefined ? [] : process.env.recipients.split(',')
};

module.exports = secrets;