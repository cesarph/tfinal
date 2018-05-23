const LanguageTranslatorV2 = require('watson-developer-cloud/language-translator/v2'),
      router = require('express').Router();


const languageTranslator = new LanguageTranslatorV2({
  username: process.env.TRANSLATOR_USER,
  password:  process.env.TRANSLATOR_PWD
});


router.post('/', (req, res) => {
    const params = {
        text: req.body.text,
        model_id: req.body.language || 'en-es', 
        accept: 'audio/wav'
    };
   
    
    languageTranslator.translate(
        params, (error, watsonResp) => {
          if (error) return console.log(error);
            
          res.json(watsonResp["translations"][0])
        }
      );
});


module.exports = router;