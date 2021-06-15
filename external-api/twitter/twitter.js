const got = require('got');
const Secret = require('../../shared/cloud-provider/index');

let bearerToken;
exports.setupCredentials = async function setupCredentials() {
    bearerToken = await Secret.secretManager.accessSecret('twitter-bearer-token');
}


exports.getTweetsForMovie = async function (searchTerm) {
    try {
        const searchURI = 'https://api.twitter.com/2/tweets/search/recent?query="' + searchTerm + '"&tweet.fields=created_at&expansions=author_id';
        const response = await got(searchURI, {
            responseType: 'json',
            headers: {
                "Authorization": "Bearer " + bearerToken
            }
        });
        // get the name from matching the user ids
        const results = response.body.data;
        results.forEach(result => {
            result.author = response.body.includes.users.find(user => user.id === result.author_id).name
        })
        return results;

    } catch (error) {
        console.log('Error using Twitter API', error.response);
        return error;
    }
};