const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/campaign', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to database');
});

const campaignSchema = new mongoose.Schema({
  itemId: Number,
  story: String,
  risks: String
});

const Campaign = mongoose.model('Campaign', campaignSchema);

const addCampaign = (obj) => {
  let newCampaign = new Campaign({
    itemId: obj.itemId,
    story: obj.story,
    risks: obj.risks
  })

  return newCampaign.save()
  .catch((err) => {
    console.log('Error with saving campaign', err);
  });
}

const emptyCampaigns = () => {
  return Campaign.deleteMany({});
}

module.exports = {
  addCampaign,
  emptyCampaigns
}