const hs = require('hearthpwn-scraper');
const warriorOpt = heroes: ['warrior'];

hs.getPopularDecks().then((decks) => {
	console.log('\nThe PopularDecks');
	console.log('=============================\n');
	console.log(decks);
});
