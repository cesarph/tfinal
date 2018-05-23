const router = require('express').Router();

router.use('/personality', require('./personality'));
router.use('/visual-recognition', require('./visual-recognition'));
router.use('/chatbot', require('./chatbot'));
router.use('/translator', require('./translator'));

module.exports = router;    