'use strict';

var path = process.cwd();
var Poll = require('../models/polls.js');
var Vote = require('../models/votes.js');

module.exports = function(app, passport) {

	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}
	app.route('/')
		.get(function(req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/polls/:id')
		.get(function(req, res) {
			res.sendFile(path + '/public/poll.html');
		});

	app.route('/mypolls')
		.get(isLoggedIn, function(req, res) {
			res.sendFile(path + '/public/mypolls.html');
		});

	app.route('/newpoll')
		.get(isLoggedIn, function(req, res) {
			res.sendFile(path + '/public/newpoll.html');
		});

	app.route('/logout')
		.get(function(req, res) {
			req.logout();
			res.redirect('/');
		});
		
	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));
		
	function apiIsLoggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			console.log('authenticated req');
			return next();
		} else {
			console.log('not auth');
			res.format({
				'text/plain': function(){
					res.status(401).send('Not logged in');
				},

				'application/json': function(){
					res.status(401).json({ message: 'Not logged in' });
				}
			});
		}
	}

	app.route('/api/user')
		.get(apiIsLoggedIn, function(req, res) {
			res.json(req.user);
		});


	app.route('/api/polls')
		.get(function(req, res) {
			Poll.find(function(err, polls) {
				if (err) { return res.status(500).json(err); }
				res.json(polls);
			});
		})
		.post(apiIsLoggedIn, function(req, res) {
			var poll = new Poll({
				title: req.body.title,
				options: req.body.options,
				userId: req.user._id,
			});
			poll.save(function(err) {
				if (err) { return res.status(500).json(err); }
				res.json(poll);
			});
		});

		app.route('/api/polls/private')
			.get(apiIsLoggedIn, function (req, res) {
				Poll.find({userId: req.user._id}, function(err, polls) {
					if (err) { return res.status(500).json(err); }
					res.json(polls);
				})
			});

    app.route('/api/polls/:id')
		.get(function(req, res) {
			Poll.findOne({
				_id: req.params.id
			}, function(err, poll) {
				if (err) { return res.status(500).json(err); }
				res.json(poll);
			});
		})
		.delete(apiIsLoggedIn, function (req, res) {
			Poll.findOne({_id: req.params.id}, function (err, poll) {
				if (err) { return res.status(500).json(err) }				
				poll.remove();
				res.json(poll);
			});
		})
		.put(apiIsLoggedIn, function (req, res) {
			Poll.findOne({
				_id: req.params.id
			},  
			function(err, poll) {
				if (err) { return res.status(500).json(err) }
				poll.options.push(req.body.option);
				poll.save(function(err) {
					if (err) console.log(err);
					res.json(poll);
				});
			})
		});

	app.route('/api/polls/:pollId/votes')
		.get(function(req, res) {
			Vote.find({
				pollId: req.params.pollId,
			}, function(err, votes) {
				if (err) res.status(500).json(err);
				res.json(votes);
			});
		})
		.post(function(req, res) {
			var vote = new Vote({
				pollId: req.params.pollId,
				option: req.body.option,
			});
			vote.save(function(err) {
				if (err) { return res.status(500).json(err); }
				res.json(vote);
			});
		});
};
