const router = require('express').Router(),
      PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');


const personalityInsights = new PersonalityInsightsV3({
  username: process.env.PERSONALITY_USER,
  password: process.env.PERSONALITY_PWD,
  version: '2018-05-12',
  url: 'https://gateway.watsonplatform.net/personality-insights/api'
});

router.post('/', (req, res) => {
    const message = `${req.body.content} lo que no ha gustado en la carrera es ${req.body.q1}. ${req.body.q2}. Mi desempeño en la carrera ha sido ${req.body.q3}`;

    personalityInsights.profile({
          content: message,
          content_type: 'text/plain',
          content_language: 'es',
          accept_language: 'es', 
          consumption_preferences: true
        }, (err, watsonResp) => {
          if (err) return res.status(400).json({"error": "El Texto debe de tener al menos 100 palabras, lo recomendable son 100"});
 
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
                name,
                consumption_preferences: consumption_preferences.filter(cons => cons.score != 0).map(
                    ({name, score}) => ({name: parseName(name), score})
                )
            }
        )).filter(cons => cons.consumption_preferences != "")
     }
}

function parseName(name) {
    name = name.slice(16, name.legth);
    const bannedSentences = ["les gusten las ", "le gusten las ", "prefiera la ", "le guste la ", "la guste la ", "le guste el ","le gusten las ", "le influya las ", "le influya la ", "le influyan las ", "prefiera el ",  "" ];

    return bannedSentences.map(sentence =>  
        (name.match(sentence)) ? name.slice(sentence.length, name.length) : "")
        .filter(val => val != "")[0];
}  
    


module.exports = router;