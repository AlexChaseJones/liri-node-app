var keysJs = require('./keys.js');

var Twitter = require('twitter');

var Spotify = require('spotify');

var Request = require('request');

var input = function() {
	var inputString = '';

	for (var i = 3; i < process.argv.length; i++) { //This loop makes it so that you can include spaces in your search
		inputString += process.argv[i];
		if (process.argv.length - 1 > i) {
			inputString += ' ';
		} else
			i == 4;
		}
		return inputString;
}

var artist = '';
switch (process.argv[2]) {
	case 'my-tweets': twitter(); break;
	case 'spotify-this-song': spotify(); break;
	case 'movie-this': movie(); break;
	case 'do-what-it-says': doIt(); break;
	default: console.log('That command is not supported');
}

function twitter() {
	var client = new Twitter ({
	  consumer_key: keysJs.twitterKeys.consumer_key,
	  consumer_secret: keysJs.twitterKeys.consumer_secret,
	  access_token_key: keysJs.twitterKeys.access_token_key,
	  access_token_secret: keysJs.twitterKeys.access_token_secret
	});
	var params = {screen_name: 'AlexanderChaseJ'};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			lineBreak();
			for (var i = 0; i < 20; i++) {
				if (tweets[i] != undefined) {
					console.log(tweets[i].created_at + ':')
					console.log('  "' + tweets[i].text + '"');
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

function spotify() {
	Spotify.search({ type: 'track', query: input()}, function(error, data) {
	    if (!error) {
	    	j = 1
	    	for (var i = 0; i < 20; i++) {
		    	if (data.tracks.items[i] != undefined) {
		    		lineBreak();
		    		console.log('    #' + j)
		    		lineBreak();
			    	console.log('Artist: ' + data.tracks.items[i].artists[0].name)//Artist name
			    	console.log('Song: ' + data.tracks.items[i].name)//Song name
			    	console.log('Album: ' + data.tracks.items[i].album.name)//Album name
			    	console.log('Preview Url: ' + data.tracks.items[i].preview_url)//Preview URL
			    } else {
			    	console.log('"What\'s my age again" by Blink-182')
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

function movie() {
	Request('http://www.omdbapi.com/?t=' + input() + '&y=&plot=short&r=json', function (error, response, body) {
	  	if (!error && response.statusCode == 200) {
	  		body = JSON.parse(body);
	  		lineBreak();
	  		console.log('Title: ' + body.Title);
	  		console.log('Year: ' + body.Year);
	  		console.log('IMDB Rating: ' + body.imdbRating);
	  		console.log('Country: ' + body.Country);
	  		console.log('Language: ' + body.Language);
	  		console.log('Plot: ' + body.Plot);
	  		console.log('Actors: ' + body.Actors);
	  		lineBreak();
		}
	})


};

function doIt() {
	console.log('execute the do it');
};

function lineBreak() {
	console.log('••••••••••••••••••••••••••••••••••••••')
}