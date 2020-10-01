const express = require('express');
const app = express();
const port = 3002;
const db = require('../db');

app.use(express.static('client/dist'));

app.get('/campaign/:itemId', (req, res) => {
  db.fetchCampaign(req.params.itemId)
    .then((campaign) => {
      if (!campaign) {
        throw 'does not exist';
      }

      res.json(campaign);
    })
    .catch((err) => {
      if (err === 'does not exist') {
        res.status(400).json('Project does not exist');
      } else if (typeof req.params.itemId !== 'number') {
        res.status(400).json('Invalid project id');
      } else {
        res.status(500).json(err);
      }
    });
})

app.listen(port, () => {
  console.log(`Campaign listening at http://localhost:${port}`);
});