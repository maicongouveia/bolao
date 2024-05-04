var express = require('express');
const userController = require('../src/user/user.controller');
const leaderboardController = require('../src/leaderboard/leaderboard.controller');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bolão do Maicão' });
});

router.get('/missingbets', userController.getMissingBettingUsers);

router.post('/bets', userController.setBets);

router.get('/leaderboard', leaderboardController.getLeaderboard);

router.get('/sleepscore', userController.getSleepScore);

module.exports = router;
