const VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3'),
      fs = require('fs'),
      router = require('express').Router();


const visualRecognition = new VisualRecognitionV3({
  api_key: process.env.VISUAL_RECOGNITION_API_KEY,
  version: '2018-03-19'
});

router.post('/poster/:id', async (req, res) => {
    const result = { id: req.params.id };
    const params = {
        images_file: fs.createReadStream(`./client/src/assets/postersypendones/${req.params.id}.jpg`),
        accept_language: 'es'
      };

    const detectFaces = new Promise ((resolve, reject) => {
        visualRecognition.detectFaces(params, (err, watsonResp) => {
            if (err) return console.log(err);

            const people = watsonResp["images"][0]["faces"].map(({ age, gender }) => (
                { 
                    age: { 
                        min: age.min, 
                        max: age.max 
                    },
                    gender: (gender.gender == 'MALE')? "Hombre" : "Mujer"
                }
            ));

            resolve(people);
        });
    });
    
    const classify = new Promise ((resolve, reject) => {
        visualRecognition.classify(params, (err, watsonResp) => {
            if (err) return console.log(err);
            
            const objects = watsonResp["images"][0]["classifiers"][0]["classes"].map(object => object.class);

            resolve(objects);
        });
    });

    result.people = await detectFaces;
    result.objects = await classify;

    res.json(result);
});

router.post('/food', (req, res) => {
    const params = {
        images_file: fs.createReadStream('prueba.jpg'),
        accept_language: 'es',
        classifier_ids: ["Areasdecomida_768439822"]
      };


    visualRecognition.classify(params, (err, watsonResp) => {
        if (err) return console.log(err);
        
        res.json(watsonResp);
    });

    
});

module.exports = router;