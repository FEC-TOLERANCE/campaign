const faker = require('faker');
const db = require('../../db');

function generateCampaigns() {
  var campaigns = [];
  return db.emptyCampaigns()
    .then(() => {
      for (var i = 1; i <= 100; i++) {
        var campaign = {
          itemId: i
        };

        campaign.story = `<p>${faker.lorem.paragraph()}</p><img src="${faker.image.abstract(500, 200, true)}"><p>${faker.lorem.paragraphs()}</p>`;

        campaign.risks = `<p>${faker.lorem.paragraphs()}</p>`;

        campaigns.push(db.addCampaign(campaign));
      }

      return Promise.all(campaigns);
    });
}

function generateProjectOwners() {
  var owners = [];
  var names = ['John Dryden', 'Samuel Pepys', 'John Bunyan', 'John Locke', 'Isaac Newton', 'Samuel Butler', 'John Wilmot', 'Aphra Behn', 'William Congreve', 'Mary Astell', 'Daniel Defoe', 'Anne Finch', 'Henry Fielding', 'Matthew Prior', 'Stephen Duck', 'Mary Collier', 'Mary Barber', 'Mary Jones', 'Lawrence Sterne', 'Thomas Chatterton'];

  return db.emptyProjectOwners()
    .then(() => {
      for (var i = 1; i <= 20; i++) {
        var owner = {
          name: names[i],
          created: Math.floor(Math.random() * 5),
          backed: Math.floor(Math.random() * 5),
          aboutMe: faker.lorem.paragraph(),
          projects: []
        }

        var j = (i * 5) - 4;

        while (j <= i * 5) {
          owner.projects.push(j);
          j++;
        }

        owners.push(db.addProjectOwner(owner));
      }

      return Promise.all(owners);
    });
}

function generatePledgeOptions() {
  var options = [];

  return db.emptyPledgeOptions()
    .then(() => {
      for (var i = 1; i <= 100; i++) {
        var option = {
          itemId: i,
          options: generateOptions()
        }

        options.push(db.addPledgeOption(option));
      }

      return Promise.all(options);
    });
}

function generateOptions() {
  var options = [];
  var shipsAnywhere = [true, false];

  for (var i = 1; i <= 4; i++) {
    var option = {
      tier: Math.floor(Math.random() * 1000),
      reward: faker.lorem.sentence(),
      rewardDetail: [],
      backers: Math.floor(Math.random() * 20)
    }

    for (var j = 0; j < 3; j++) {
      option.rewardDetail.push(faker.lorem.words());
    }

    option.estimatedDelivery = `${Math.floor(Math.random() * 10 + 2020)}-${Math.floor(Math.random() * 12 + 1)}-${Math.floor(Math.random() * 27 + 1)}`;

    option.shippingLocation = shipsAnywhere[Math.floor(Math.random() * 2 + 1)];

    options.push(option);
  }

  return options;
}

generateCampaigns()
  .then(() => {
    return generateProjectOwners();
  })
  .then(() => {
    return generatePledgeOptions();
  })
  .then(() => {
    process.exit();
  });