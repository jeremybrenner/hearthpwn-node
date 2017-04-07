const hs = require('hearthpwn-scraper');

hs.getPopularDecks().then((decks) => {
	console.log('\n\n*** The Popular Decks ***');
	console.log('=============================\n\n');
	decks.map((deck) => {
		console.log('* Name : ' + deck.title);
		console.log('* URL  : ' + deck.url);
		console.log('------------------------');
	});
});
