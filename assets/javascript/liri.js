//Module imports
var keysJs = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('spotify');
var Request = require('request');
var fs = require('fs');
//This loop makes it possible to include spaces in the search.
var input = function() {
	var inputString = '';
	for (var i = 3; i < process.argv.length; i++) {
		inputString += process.argv[i];
		if (process.argv.length - 1 > i) {
			inputString += ' ';
		} else {
			i == 4;
		}
	}
	return inputString;
};
function execute(executor, execution) {
	switch (executor) {
		case 'tweets': twitter(execution); break;
		case 'spotify': spotify(execution); break;
		case 'movie': movie(execution); break;
		case 'do-it': doIt(); break;
		default: console.log('Try typing "tweets <user name>", "spotify <song name>", "movie <movie name>", or "do-it"!');
	}
};
function twitter(screenName) {
	if (process.argv[3] = '') { screenName = 'AlexanderChaseJ'}
	var client = new Twitter ({
	  consumer_key: keysJs.twitterKeys.consumer_key,
	  consumer_secret: keysJs.twitterKeys.consumer_secret,
	  access_token_key: keysJs.twitterKeys.access_token_key,
	  access_token_secret: keysJs.twitterKeys.access_token_secret
	});
	var params = {screen_name: screenName};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			lineBreak();
			for (var i = 0; i < 20; i++) {
				if (tweets[i] != undefined) {
					logAndAppend(tweets[i].created_at + ':')
					logAndAppend('  "' + tweets[i].text + '"');
				}else {
					i = 20;
				}
			}
			lineBreak();
		}
		else {
			console.log('Error occurred: ' + error);
	        return;
		}
	
	});
};
function spotify(choice) {
	if (!choice) {choice = 'Whats my age again'};
	Spotify.search({ type: 'track', query: choice}, function(error, data) {
	    if (!error) {
	    	j = 1
	    	for (var i = 0; i < 20; i++) {
		    	if (data.tracks.items[i] != undefined) {
		    		lineBreak();
		    		logAndAppend('    #' + j)
		    		lineBreak();
			    	logAndAppend('Artist: ' + data.tracks.items[i].artists[0].name)//Artist name
			    	logAndAppend('Song: ' + data.tracks.items[i].name)//Song name
			    	logAndAppend('Album: ' + data.tracks.items[i].album.name)//Album name
			    	logAndAppend('Preview Url: ' + data.tracks.items[i].preview_url)//Preview URL
			    }
			    j++;
			}
			lineBreak();
	    }
	    else {
	    	console.log('Error occurred: ' + error);
	        return;
	    }
	});
};
function movie(choice) {
	if (!choice) {choice = 'mr nobody'};
	Request('http://www.omdbapi.com/?t=' + choice + '&y=&plot=short&r=json', function (error, response, body) {
	  	if (!error && response.statusCode == 200) {
	  		body = JSON.parse(body);
	  		lineBreak();
	  		logAndAppend('Title: ' + body.Title);
	  		logAndAppend('Year: ' + body.Year);
	  		logAndAppend('IMDB Rating: ' + body.imdbRating);
	  		logAndAppend('Country: ' + body.Country);
	  		logAndAppend('Language: ' + body.Language);
	  		logAndAppend('Plot: ' + body.Plot);
	  		logAndAppend('Actors: ' + body.Actors);
	  		lineBreak();
	  	} else {
	  		console.log('Error occurred: ' + error);
	  		return;
	  	}
	})
};
function doIt() {
	fs.readFile('../../random.txt', 'utf8', function(error, data) {
		if (!error) {
			exeArray = data.split(',');
			execute(exeArray[0], exeArray[1]);
		} else {
			console.log('Error occurred: ' + error);
		}	
	})

};
function lineBreak() {
	console.log('•••••••••••••••••∆•∆•∆•••••••••••••••••');
	fs.appendFile('../output/output.txt', '•••••••••••••••••∆•∆•∆•••••••••••••••••', 'utf8', function(error) {
		if (error) {
			console.log(error)
		}
	})
};

function logAndAppend(info) {
	console.log(info);
	fs.appendFile('../output/log.txt', info, 'utf8', function(error) {
		if (error) {
			console.log(error)
		}
	})
}
execute(process.argv[2], input());