const faker = require('faker');
const db = require('../../db');

function generateCampaigns() {
  let campaigns = [];
  return db.emptyCampaigns()
    .then(() => {
      for (let i = 1; i <= 100; i++) {
        let campaign = {
          itemId: i
        };

        campaign.story = `<p>${faker.lorem.paragraph()}</p><img src="${faker.image.abstract(500, 200, true)}"><p>${faker.lorem.paragraphs()}</p>`;

        campaign.risks = `<p>${faker.lorem.paragraphs()}</p>`;

        campaigns.push(db.addCampaign(campaign));
      }

      return Promise.all(campaigns);
    });
}


generateCampaigns()
  .then(() => {
    process.exit();
  })
  .catch((err) => {
    console.log('Error with loading campaign database', err);
  });