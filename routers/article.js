const router = require('express').Router();
const controller = require('../controllers/article');
const auth = require('../utils/auth');

router.get('/create', auth(true), controller.get.create);
router.get('/all', auth(true), controller.get.all);
router.get('/search', auth(true), controller.get.search);
router.get('/details/:articleId', auth(true), controller.get.details);
router.get('/edit/:articleId', auth(true), controller.get.edit);
router.get('/delete/:articleId', auth(true), controller.get.delete);


router.post('/create', auth(true), controller.post.create);
router.post('/edit/:articleId', auth(true), controller.post.edit);


module.exports = router;