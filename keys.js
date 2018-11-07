console.log('this is loaded');

exports.twitterKeys = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

exports.spotifyKeys = {
  client_id: process.env.SPOTIFY_ID,
  client_secret: process.env.SPOTIFY_SECRET
};

 exports.omdbKey = {
   api_key: '7425e62c'
 };