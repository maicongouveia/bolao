var express = require('express');
const userController = require('../src/user/user.controller');
var router = express.Router();

/* GET users listing. */
router.get('/', userController.getUsers);

router.get('/bets', userController.getBetsByDate)

module.exports = router;
