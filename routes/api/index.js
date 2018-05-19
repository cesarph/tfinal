const router = require('express').Router();


router.use('/personality', require('./personality'));

module.exports = router;    