const fs = require('fs');

class TwitterService {
  postAlert (client, areas) {
    client.post('media/upload', {media: fs.readFileSync('images/alert.jpg')}, (error, media, response) => {
      if (!error) {
        let areasText = areas.join(', ');
        let params = {
          status: `התקבלה התרעה ביישובים: ${areasText}`,
          media_ids: media.media_id_string
        };
        client.post('statuses/update', params, (error, data, response) => {
          if (!error) {
            console.log(params);
          }
        });
      }
    });
  };
}

module.exports = new TwitterService();