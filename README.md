# hearthpwn-node
A utility so I can check decks without having to go to the hearthpwn site <3 Supports custom class CLI options.

### Technologies:
* hearthpwn-scraper
* commander
* node 7.0.0

### To get started:
```
npm install
```

```
npm start
```

### To pass custom class flags from the directory
```
npm start -- -c warrior,priest
```

* Or using a bash alias
```
alias -c warrior,priest
```

NOTE: The -c flag expects mutliple values without no spaces between options ( warrior,rogue,druid etc.)