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

const projectOwnerSchema = new mongoose.Schema({
  name: String,
  created: Number,
  backed: Number,
  aboutMe: String,
  projects: [Number]
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
const ProjectOwner = mongoose.model('Project Owner', projectOwnerSchema);
const PledgeOptions = mongoose.model('Pledge Options', pledgeOptionsSchema);

var addCampaign = (obj) => {
  var newCampaign = new Campaign({
    itemId: obj.itemId,
    story: obj.story,
    risks: obj.risks
  });

  return newCampaign.save();
}

var emptyCampaigns = () => {
  return Campaign.deleteMany({});
}

var addProjectOwner = (obj) => {
  var newOwner = new ProjectOwner({
    name: obj.name,
    created: obj.created,
    backed: obj.backed,
    aboutMe: obj.aboutMe,
    projects: obj.projects
  });

  return newOwner.save();
}

var emptyProjectOwners = () => {
  return ProjectOwner.deleteMany({});
}

module.exports.addCampaign = addCampaign;
module.exports.emptyCampaigns = emptyCampaigns;
module.exports.addProjectOwner = addProjectOwner;
module.exports.emptyProjectOwners = emptyProjectOwners;