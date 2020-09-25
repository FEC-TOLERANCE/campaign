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

const pledgeOwnerSchema = new mongoose.Schema({
  itemId: Number,
  name: String,
  firstCreated: Date,
  numberBacked: Number,
  aboutMe: String
});

const pledgeOptionsSchema = new mongoose.Schema({
  itemId: Number,
  options: [
    {
      tier: Number,
      reward: String,
      rewardDetail: String,
      estimatedDelivery: Date,
      shippingLocation: String,
      backers: Number
    }
  ]
});

const Campaign = mongoose.model('Campaign', campaignSchema);
const PledgeOwner = mongoose.model('Pledge Owner', pledgeOwnerSchema);
const PledgeOptions = mongoose.model('Pledge Options', pledgeOptionsSchema);