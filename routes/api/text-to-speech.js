const TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1'),
      router = require('express').Router(),
      fs = require('fs');

const textToSpeech = new TextToSpeechV1({
  username: process.env.TEXT_TO_SPEECH_USER,
  password: process.env.TEXT_TO_SPEECH_PWD,
  url: 'https://stream.watsonplatform.net/text-to-speech/api/'
});


router.post('/', (req, res) => {
    const params = {
        text: req.body.text,
        voice: req.body.voice, 
        accept: 'audio/wav'
    };

    textToSpeech
    .synthesize(params, (err, audio) => {
        if (err) return console.log(err);

        textToSpeech.repairWavHeader(audio);
        fs.writeFileSync('./client/src/assets/audio.wav', audio);
        console.log('audio.wav written with a corrected wav header');
        res.end();
    });
});

module.exports = router;