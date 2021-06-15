const Firestore = require('@google-cloud/firestore');


let database;
if (process.env.ENVIRONMENT === 'local') {
    database = new Firestore({
        projectId: process.env.PROJECT_ID,
        keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    });
} else {
    database = new Firestore();
}

module.exports = {
    database
};