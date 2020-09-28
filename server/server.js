const express = require('express');
const app = express();
const port = 3002;
const db = require('../db');

app.use(express.static('client/dist'));

app.get('/campaign/:itemId', (req, res) => {
  db.fetchCampaign(req.params.itemId)
    .then((campaign) => {
      res.json(campaign);
    })
    .catch((err) => {
      console.log('Error with fetching campaign', err);
    });
})

app.listen(port, () => {
  console.log(`Campaign listening at http://localhost:${port}`);
});