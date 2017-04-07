const hs = require('hearthpwn-scraper');
const warriorOpt = { heroes: ['warrior'] };

hs.getPopularDecks().then((decks) => {
	console.log('\nThe PopularDecks');
	console.log('=============================\n');
	decks.map((deck) => {
		console.log('* Name : ' + deck.title);
		console.log('* URL  : ' + deck.url);
		console.log('------------------------');
	});
});
