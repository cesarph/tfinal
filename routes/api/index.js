const router = require('express').Router();

router.use('/chatbot', require('./chatbot'));
router.use('/personality', require('./personality'));

module.exports = router;    