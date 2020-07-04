const router = require('express').Router();
const controller = require('../controllers/user');

router.get('/register',controller.get.register);
router.get('/login',controller.get.login);
router.get('/logout',controller.get.logout);


router.post('/register',controller.post.register);
router.post('/login',controller.post.login);

module.exports= router;