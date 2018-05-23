const AssistantV1 = require('watson-developer-cloud/assistant/v1'),
      router = require('express').Router();

const assistant = new AssistantV1({
  username: process.env.WATSON_ASSISTANT_USER,
  password: process.env.WATSON_ASSISTANT_PWD,
  url: 'https://gateway.watsonplatform.net/assistant/api/',
  version: '2018-02-16'
});

router.post('/', (req, res) => {
    assistant.message({
        input: { text: req.body.message },
        workspace_id: process.env.WATSON_ASSISTANT_WORKSPACE
    }, (err, watsonResp) => {
        if (err) return console.error(err);      
        
        res.json({ 
            question: req.body.message,
            response: watsonResp.output.text[0] 
        });
    }
    );
});

module.exports = router;