const FireStore = require('./google/firestore');
const GoogleSecretManager = require('./google/secret');

exports.database = FireStore.database;
exports.FireStoreFieldValue = FireStore.FieldValue;
exports.secretManager = GoogleSecretManager;