const router = require('express').Router();
const controller = require('../controllers/user');
const auth = require('../utils/auth');

router.get('/register',auth(false),controller.get.register);
router.get('/login',auth(false),controller.get.login);
router.get('/logout',auth(),controller.get.logout);


router.post('/register',auth(false),controller.post.register);
router.post('/login',auth(false),controller.post.login);

module.exports= router;