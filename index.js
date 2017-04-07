const hs       = require('hearthpwn-scraper');
const commands = require('commander');
const prompt   = require('cli-prompt');

let options  = { heroes: [] };
let decks = [];
let count = 0;

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

const promptUser = () => {
	const valid = ['Y','y','N','n'];
	prompt('\n => Would you like to know more? (Y/N): ', (input) => {
		if (valid.indexOf(input) === -1) {
			console.log('WRONG');
			console.log(input);
		} else {
			console.log('CORRECT');
			console.log(input);
		}
	})
};

const logResults = () => {
	decks.forEach((d) => {
		console.log('* Name : ' + d.title);
		console.log('* URL  : ' + d.url);
		console.log('* ID   : ' + d.id);
		console.log('------------------------');
	})
	promptUser();
};

// fetch relevant decks from hearthpwn
const fetchDecks = () => {
	hs.getPopularDecks(options)
	.then((results) => {
		console.log('\n\n*** Search Results ***');
		console.log('=============================\n\n');
		decks = results.map((deck) => {
			let rdyDeck = {};
			rdyDeck.title = deck.title;
			rdyDeck.url = deck.url;
			rdyDeck.id = count;
			count ++;
			return rdyDeck;
		});
		logResults();
	});
};

fetchDecks();





