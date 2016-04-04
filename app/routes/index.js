'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
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

    var clickHandler = new ClickHandler();

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

    app.route('/login')
        .get(function(req, res) {
            res.sendFile(path + '/public/login.html');
        });

    app.route('/logout')
        .get(function(req, res) {
            req.logout();
            res.redirect('/login');
        });

    app.route('/profile')
        .get(isLoggedIn, function(req, res) {
            res.sendFile(path + '/public/profile.html');
        });

    app.route('/api/user')
        .get(isLoggedIn, function(req, res) {
            res.json(req.user.github);
        });

    app.route('/auth/github')
        .get(passport.authenticate('github'));

    app.route('/auth/github/callback')
        .get(passport.authenticate('github', {
            successRedirect: '/',
            failureRedirect: '/login'
        }));

    app.route('/api/polls')
        .get(function(req, res) {
            Poll.find(function(err, polls) {
                if (err) { return res.status(500).json(err); }
                res.json(polls);
            });
        })
        .post(isLoggedIn, function(req, res) {
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

    app.route('/api/polls/:id')
        .get(function(req, res) {
            Poll.findOne({
                _id: req.params.id
            }, function(err, poll) {
                if (err) { return res.status(500).json(err); }
                res.json(poll);
            });
        })
        .delete()
        .put();

    app.route('/api/polls/:pollId/votes')
        .get(function (req, res) {
            Vote.find(function (err, votes) {
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
