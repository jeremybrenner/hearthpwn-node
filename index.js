const hs      = require('hearthpwn-scraper');
const commands = require('commander');
const options = { heroes: [] };

// split class flag arguments
const splitClasses = (val) => {
	return val.split(',');
} 

// capture and parse command arguments
commands
	.version('0.0.1')
	.option('-c, --classes [classes]', 'Filter decks by class', splitClasses)
	.parse(process.argv);

// if classes are passed, set them to option for deck fetch
// if(commands.classes) { 
// 	options.heroes = commands.classes
// }

// fetch relevant decks from hearthpwn
hs.getPopularDecks().then((decks) => {
	// console.log('\n\n*** The Popular Decks ***');
	// console.log('=============================\n\n');
	decks.map((deck) => {
		// console.log('* Name : ' + deck.title);
		// console.log('* URL  : ' + deck.url);
		// console.log('------------------------');
	});
});
