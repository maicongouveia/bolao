var express = require('express');
const userController = require('../src/user/user.controller');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bolão do Maicão' });
});

router.get('/missingbets', userController.getMissingBettingUsers);

router.post('/bets', userController.setBets)

module.exports = router;
