const VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3'),
      fs = require('fs'),
      download = require('image-downloader'),
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

    const options = {
        url: req.body.url,
        dest: './Uploads/photo.jpg'
    }
       
    async function downloadIMG() {
        try {
            const { filename, image } = await download.image(options)

            const params = {
                images_file: fs.createReadStream(`${filename}`),
                accept_language: 'es',
                classifier_ids: ["Areasdecomida_768439822"]
            };
        
            visualRecognition.classify(params, (err, watsonResp) => {
                if (err) return console.log(err);
                
                let objects = watsonResp["images"][0]["classifiers"][0]["classes"].map(object => object.class);
                console.log(objects);
                objects = (objects.length) ? objects : ["No es un area de comida"];

                res.json({ objects });
            });w



        } catch (e) {
            throw e
        }
    }
    
    downloadIMG()

    
    
});

module.exports = router;