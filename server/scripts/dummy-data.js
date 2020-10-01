const faker = require('faker');
const db = require('../../db');

function generateCampaigns() {
  const text = ['<p>In consequence of an agreement between the sisters, Elizabeth wrote the next morning to their mother, to beg that the carriage might be sent for them in the course of the day. But Mrs. Bennet, who had calculated on her daughters remaining at Netherfield till the following Tuesday, which would exactly finish Jane’s week, could not bring herself to receive them with pleasure before. Her answer, therefore, was not propitious, at least not to Elizabeth’s wishes, for she was impatient to get home. Mrs. Bennet sent them word that they could not possibly have the carriage before Tuesday; and in her postscript it was added, that if Mr. Bingley and his sister pressed them to stay longer, she could spare them very well. Against staying longer, however, Elizabeth was positively resolved--nor did she much expect it would be asked; and fearful, on the contrary, as being considered as intruding themselves needlessly long, she urged Jane to borrow Mr. Bingley’s carriage immediately, and at length it was settled that their original design of leaving Netherfield that morning should be mentioned, and the request made.</p>', '<p>The communication excited many professions of concern; and enough was said of wishing them to stay at least till the following day to work on Jane; and till the morrow their going was deferred. Miss Bingley was then sorry that she had proposed the delay, for her jealousy and dislike of one sister much exceeded her affection for the other.</p>', '<p>The master of the house heard with real sorrow that they were to go so soon, and repeatedly tried to persuade Miss Bennet that it would not be safe for her--that she was not enough recovered; but Jane was firm where she felt herself to be right.</p>', '<p>To Mr. Darcy it was welcome intelligence--Elizabeth had been at Netherfield long enough. She attracted him more than he liked--and Miss Bingley was uncivil to her, and more teasing than usual to himself. He wisely resolved to be particularly careful that no sign of admiration should now escape him, nothing that could elevate her with the hope of influencing his felicity; sensible that if such an idea had been suggested, his behaviour during the last day must have material weight in confirming or crushing it. Steady to his purpose, he scarcely spoke ten words to her through the whole of Saturday, and though they were at one time left by themselves for half-an-hour, he adhered most conscientiously to his book, and would not even look at her.</p>', '<p>On Sunday, after morning service, the separation, so agreeable to almost all, took place. Miss Bingley’s civility to Elizabeth increased at last very rapidly, as well as her affection for Jane; and when they parted, after assuring the latter of the pleasure it would always give her to see her either at Longbourn or Netherfield, and embracing her most tenderly, she even shook hands with the former. Elizabeth took leave of the whole party in the liveliest of spirits.</p>', '<p>They were not welcomed home very cordially by their mother. Mrs. Bennet wondered at their coming, and thought them very wrong to give so much trouble, and was sure Jane would have caught cold again. But their father, though very laconic in his expressions of pleasure, was really glad to see them; he had felt their importance in the family circle. The evening conversation, when they were all assembled, had lost much of its animation, and almost all its sense by the absence of Jane and Elizabeth.</p>', '<p>They found Mary, as usual, deep in the study of thorough-bass and human nature; and had some extracts to admire, and some new observations of threadbare morality to listen to. Catherine and Lydia had information for them of a different sort. Much had been done and much had been said in the regiment since the preceding Wednesday; several of the officers had dined lately with their uncle, a private had been flogged, and it had actually been hinted that Colonel Forster was going to be married.</p>', '<p>“I hope, my dear,” said Mr. Bennet to his wife, as they were at breakfast the next morning, “that you have ordered a good dinner to-day, because I have reason to expect an addition to our family party.”</p>', '<p>“Who do you mean, my dear? I know of nobody that is coming, I am sure, unless Charlotte Lucas should happen to call in--and I hope my dinners are good enough for her. I do not believe she often sees such at home.”</p>', '<p>“The person of whom I speak is a gentleman, and a stranger.”</p>'];
  const images = ['<img src="https://images.pexels.com/photos/808510/pexels-photo-808510.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"></img>', '<img src="https://images.pexels.com/photos/824572/pexels-photo-824572.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"></img>', '<img src="https://images.pexels.com/photos/5770/leaf-spring-leaves-plants.jpg?auto=compress&cs=tinysrgb&h=750&w=1260"></img>', '<img src="https://images.pexels.com/photos/2877188/pexels-photo-2877188.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"></img>', '<img src="https://images.pexels.com/photos/2441454/pexels-photo-2441454.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"></img>', '<img src="https://images.pexels.com/photos/88502/tulips-holland-tulip-fields-royalty-free-88502.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"></img>', '<img src="https://images.pexels.com/photos/797797/pexels-photo-797797.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"></img>', '<img src="https://images.pexels.com/photos/711004/pexels-photo-711004.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"></img>', '<img src="https://images.pexels.com/photos/789818/pexels-photo-789818.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"></img>', '<img src="https://images.pexels.com/photos/69498/pexels-photo-69498.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"></img>'];
  let campaigns = [];

  return db.emptyCampaigns()
    .then(() => {
      for (let i = 1; i <= 100; i++) {
        let campaign = {
          itemId: i,
          story: [],
          risks: []
        };

        for (let i = 0; i < 6; i++) {
          let storyIndex = getRandomId();
          let risksIndex = getRandomId();
          if (i === 1 || i === 3) {
            campaign.story.push(images[storyIndex]);
          } else {
            campaign.story.push(text[storyIndex]);
          }

          if (i < 4) {
            campaign.risks.push(text[risksIndex]);
          }
        }

        campaigns.push(db.addCampaign(campaign));
      }

      return Promise.all(campaigns);
    });
}

function getRandomId() {
  var id = Math.floor(Math.random() * 10);
  return id;
}


generateCampaigns()
  .then(() => {
    process.exit();
  })
  .catch((err) => {
    console.log('Error with loading campaign database', err);
  });