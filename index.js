const hs      = require('hearthpwn-scraper');
const commands = require('commander');
const options = { heroes: [] };

// split class flag arguments
const splitClasses = (val) => {
	return val.split(',');
} 

// capitialize each class for logging
const capitalize = (string) => {
	return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
}

// capture and parse command arguments
commands
	.version('0.0.1')
	.option('-c, --classes [classes]', 'Filter decks by class', splitClasses)
	.parse(process.argv);

// if classes are passed, set them to option for deck fetch
if(commands.classes) { 
	options.heroes = commands.classes
}

// indicate search, log custom class options being passed
console.log('\nSearching for decks...');

if(options.heroes.length > 0) {
	console.log('\nWith the following classes :');
	options.heroes.map((c) => { 
		console.log(' * ' + capitalize(c)) 
	});
};

// fetch relevant decks from hearthpwn
hs.getPopularDecks(options)
.then((decks) => {
	console.log('\n\n*** Search Results ***');
	console.log('=============================\n\n');
	decks.map((deck) => {
		console.log('* Name : ' + deck.title);
		console.log('* URL  : ' + deck.url);
		console.log('------------------------');
	});
})
.then(()=> {
	console.log('\n\n*** EXITING ***\n\n');
	// shut down node process
	process.exit();
})


