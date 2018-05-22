const router = require('express').Router(),
      PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');


const personalityInsights = new PersonalityInsightsV3({
  username: process.env.PERSONALITY_USER,
  password: process.env.PERSONALITY_PWD,
  version: '2018-05-12',
  url: 'https://gateway.watsonplatform.net/personality-insights/api'
});

router.post('/', (req, res) => {
    console.log(req.body);
    personalityInsights.profile({
          content: req.body.content,
          content_type: 'text/plain',
          content_language: 'es',
          accept_language: 'es', 
          consumption_preferences: true
        }, (err, watsonResp) => {
          if (err) return console.log(err);

          res.status(200).json(parseJSON(watsonResp));
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
                percentile: (percentile*100).toFixed(1) ,
                children: children.map(( {name, percentile} ) => ({ name, percentile: (percentile*100).toFixed(1) }))
            }
        )),
        needs: needs.map(({ name, percentile }) => ({ name, percentile: (percentile*100).toFixed(1)})),
        values: values.map(({ name, percentile }) => ({ name, percentile: (percentile*100).toFixed(1) })),
        consumption_preferences: consumption_preferences.map(({ name, consumption_preferences }) => (
            {
                name: name,
                consumption_preferences: consumption_preferences.filter(cons => cons.score != 0).map(
                    ({name, score}) => ({name, score})
                )
            }
        )).filter(cons => cons.consumption_preferences != "")
     }
}



module.exports = router;