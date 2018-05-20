const router = require('express').Router(),
      PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');

require('dotenv').config();

const personalityInsights = new PersonalityInsightsV3({
  username: process.env.PERSONALITY_USER,
  password: process.env.PERSONALITY_PWD,
  version: '2018-05-12',
  url: 'https://gateway.watsonplatform.net/personality-insights/api'
});

router.post('/', (req, res) => {
    
    personalityInsights.profile({
          content: req.body.content,
          content_type: 'text/plain',
          content_language: 'es',
          accept_language: 'es', 
          consumption_preferences: true
        }, (err, watsonResp) => {
          if (err) return console.log('error:', err);
          
          res.json(parseJSON(watsonResp));
        }
    );

});

function parseJSON({ word_count, word_count_message, personality, needs, values, consumption_preferences }) {
    
    return { 
        word_count, 
        word_count_message,
        personality: personality.map(({ name, percentile, children }) => (
            {
                name,
                percentile,
                children: children.map(( {name, percentile} ) => ({name, percentile }))
            }
        )),
        needs: needs.map(({ name, percentile }) => ({ name, percentile})),
        values: values.map(({ name, percentile }) => ({ name, percentile })),
        consumption_preferences: consumption_preferences.map(({ name, consumption_preferences }) => (
            {
                name,
                consumption_preferences: consumption_preferences.map(( {name, score} ) => ({ name, score}))
            }
        ))
     }
}

module.exports = router;