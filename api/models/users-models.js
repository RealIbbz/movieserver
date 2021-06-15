const storage = require('../../shared/cloud-provider/index')

exports.createUser = async function (newUser) {

    const documentReference = await storage.database.collection('users').add(
        newUser
    );

    const newCreatedUser = { ...newUser, id: documentReference.id };
    delete newCreatedUser.password;
    return newCreatedUser;
}

exports.getUser = async function (userId) {
    const documentReference = storage.database.collection('users').doc(userId);
    return await documentReference.get();
}


exports.findUserByEmail = async function (userEmail) {
    const usersReference = storage.database.collection('users');
    const snapshot = await usersReference.where('email', '==', userEmail).get();
    if (snapshot.empty) {
        console.log('No matching documents.');
        return;
    }
    return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
}