const router = require('express').Router();

router.use('/personality', require('./personality'));
router.use('/text-to-speech', require('./text-to-speech'));
router.use('/visual-recognition', require('./visual-recognition'));

module.exports = router;    