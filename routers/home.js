const router = require('express').Router();
const controller = require('../controllers/home');
const auth = require('../utils/auth');

router.get('/',auth(false), controller.get.home)
router.get('/home',auth(true), controller.get.home)

module.exports = router;