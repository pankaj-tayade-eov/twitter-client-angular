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
var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
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
