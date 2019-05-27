const twitterAPI = require('node-twitter-api');

class TwitterAPI {
    request(res) {
        this.twitter.getRequestToken(function(err, requestToken, requestSecret) {
            if (err)
                console.log('getRequestToken failed');
            else {
                this._requestSecret = requestSecret;
                res.redirect("https://api.twitter.com/oauth/authenticate?oauth_token=" + requestToken);
            }
        });
    }

    getAccessToken(requestToken, verifier) {
        this.twitter.getAccessToken(requestToken, this._requestSecret, verifier, function(err, accessToken, accessSecret) {
            if (err)
                console.log('getAccessToken failed');
            else
                this.twitter.verifyCredentials(accessToken, accessSecret, function(err, user) {
                    if (err)
                        console.log('verifyCredentials failed');
                    else
                        console.log(user);
                });
        });
    }
}

module.exports = new TwitterAPI();
