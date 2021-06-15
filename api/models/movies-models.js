const storage = require('../../shared/cloud-provider/index')

exports.addFavourite = async function (userId, favourite) {
    // Get the doc - see if it exists, if it does, add our new favourite to the array, then update the database with the new array
    // If it doesnt existi, add it to the collection
    const documentReference = storage.database.collection('favourites').doc(userId);
    let result = await documentReference.get();
    if (result.exists) {
        const favourites = result.data().favourites;
        if (!favourites.some(existingFavourite => existingFavourite.id === favourite.id)) {
            favourites.push(favourite);
            return await documentReference
                .update({
                    favourites,
                }).then(async () => {
                    return true;
                })
        } else {
            return false;
        }
    } else {
        return await documentReference.set({
            favourites: [favourite]
        }).then(() => true);
    }
}

exports.removeFavourite = async function (userId, movieId) {
    // check to make sure our movie id is numeric to match the database type
    // get the favourites array, make sure the movie is in it, if it is, splice it out
    // then update it back to the database
    if (!isNaN(movieId)) {
        const movieIdNum = Number(movieId)
        const documentReference = storage.database.collection('favourites').doc(userId);
        let userResult = await documentReference.get();
        const favourites = userResult.data().favourites;
        const index = favourites.findIndex(databaseFavourite => movieIdNum === databaseFavourite.id);
        if (index > -1) {
            favourites.splice(index, 1);
            return await documentReference
                .update({
                    favourites,
                }).then(async () => {
                    return true;
                })
        } else {
            return false;
        }
    } else {
        return false;
    }
}

exports.getFavourites = async function (userId) {
    const documentReference = storage.database.collection('favourites').doc(userId);
    const results = await documentReference.get();
    if (results.exists) {
        return results.data();
    } else {
        return { favourites: [] };
    }
}