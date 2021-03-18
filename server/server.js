'use strict';

const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
var Twitter = require('twitter');
const app = express();

const corsOption = {
  origin: true,
  methods: 'GET,POST'
};
app.use(cors(corsOption));

//Todo: put these keys in .env file and then get it from env veriables.
//var client = new Twitter({
//  consumer_key: '',
//  consumer_secret: '',
//  access_token_key: '',
//  access_token_secret: ''
//});

var client = new Twitter({
  consumer_key: 'Q9huwMqSpZLwXSrQ9VgHI4zig',
  consumer_secret: 'dvjdWGPcEZMIrDlrifWfp6HgyFDzv0dgqNbp5Tihzdzak75Azc',
  access_token_key: '1370982172425744384-lfKZCKhPskDSo1zqgQi68moPaAUYRs',
  access_token_secret: '0qFYtreoRgobhvXkqFXYG5bsmLmq3Beqa5tDp9T2xvHGv'
});

app.get('/tweets', (req, res) => {
	var params = {screen_name: req.query.twitter_user_name, count: req.query.count};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (error) {
	    	res.status(500).send({message: 'Error getting user tweets'});
	  } else {
	  	res.status(200).send(tweets);
	  }
	});
});	

app.listen(8080, function() {
  console.log('App running on port 8080!');
});
