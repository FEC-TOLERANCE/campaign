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

      return Promise.all(campaigns)
        .then(() => {
          console.log('Saved campaigns');
        });
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

      return Promise.all(owners)
        .then(() => {
          console.log('Saved project owners');
        });
    });
}

generateCampaigns();
generateProjectOwners();