const fs = require('fs');

class TwitterService {
  postAlert (client, areas) {
    let areasText = areas.join(', ');
    this.uploadPost(client, `התקבלה התרעה ביישובים: ${areasText}`, fs.readFileSync('images/alert.jpg'));
  };

  uploadPost (client, status, image) {
    client.post('media/upload', {media: image}, (error, media, response) => {
      if (!error) {
        let params = {
          status: status,
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