const hs       = require('hearthpwn-scraper');
const commands = require('commander');
const prompt   = require('cli-prompt');

let options  = { heroes: [] };
let decks = [];
let count = 0;

const vaildYesOrNo = (response) => {
	const valid = ['y','yes','n','no'];
	let input = {};
	input.value = response.toLowerCase();
	if(valid.indexOf(input.value) === -1) input.valid = false;
	if(valid.indexOf(input.value) !== -1) input.valid = true;
	return input;
};

const finalPrompt = () => {
	// either exit or display deck list again
	prompt('\n * Would you like to go back to the deck list? (Y/N) : ', (response) => {
		let input = vaildYesOrNo(response);
		if (input.valid === false) {
			console.log('\n * ERROR: Invalid input : ' + input.value + ' * ');
			deckDetailPrompt();
		}else if(input.value === 'n' || input.valid === 'no') {
			console.log('\n *** EXITING ***');
			process.exit();
		}else {
			logResults();
		}
	})
};

const handleValidDetail = () => {
	const first = parseInt(decks[0].id);
	const last  = parseInt(decks[decks.length-1].id);
	prompt('\n Which deck would you like to know more about ? [' + first + ' - ' + last + '] : ', (response) => {
		const intId = parseInt(response) || 0;
		if (intId <= 0 || intId > last) {
			console.log('* ERROR: Please enter a valid deck ID [' + first + ' - ' + last + '] : ');
			handleValidDetail();
		}else {
			let url = decks[intId].url;
			hs.getDeckInfo(url).then((deck) => {
				console.log('\n\n     *** Deck List ***      ');
				console.log('=============================\n');
				deck.map((c) => {
					console.log('* ' + c.card + '  x (' + c.quantity + ') ');
				});
				console.log('\n=============================\n\n');
				finalPrompt();
			});
		}
	});
};

const deckDetailPrompt = () => {
	prompt('\n * Would you like to know more? (Y/N): ', (response) => {
		let input = vaildYesOrNo(response);
		if (input.valid === false) {
			console.log('\n * ERROR: Invalid input : ' + input.value + ' * ');
			deckDetailPrompt();
		}else if(input.value === 'n' || input.valid === 'no') {
			console.log('\n *** EXITING ***');
			process.exit();
		}else {
			handleValidDetail();
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
	deckDetailPrompt();
};

// fetch relevant decks from hearthpwn
const fetchDecks = () => {

	// if classes are passed, set them to option for deck fetch
	if(commands.classes) options.heroes = commands.classes

	// indicate search, log custom class options being passed
	console.log('\nSearching for decks...');

	if(options.heroes.length > 0) {

		// capitialize each class for logging
		const capitalize = (string) => { return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase() };

		console.log('\nWith the following classes :');

		options.heroes.map((c) => { 
			console.log(' * ' + capitalize(c)) 
		});
	};

	hs.getPopularDecks(options)
	.then((results) => {
		console.log('\n\n   *** Search Results ***    ');
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

const parseArgs = () => {

	// split class flag arguments
	const splitClasses = (val) => { return val.split(',') }; 

	// capture and parse command arguments
	commands
		.version('0.0.1')
		.option('-c, --classes [classes]', 'Filter decks by class', splitClasses)
		.parse(process.argv);

	fetchDecks();
}

const init = () => { parseArgs() };

init();





