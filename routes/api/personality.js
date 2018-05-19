const router = require('express').Router(),
      PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
const text = "Mi nombre es Juan Manuel Pérez. Desde que era pequeño me gusta mucho hacer ejercicio, siempre he sido muy atleta, he practicado fútbol, básquetbol, béisbol, natación y atletismo. Conforme fui creciendo le fui agarrando más gusto a estudiar, a leer temas de interés y a aprender un poco de todo lo que se pueda. Me gusta investigar acerca de las tecnologías actuales, pasadas y lo que tienen pensado para el futuro, pues creo que es importante saber qué es lo que está pasando en nuestra sociedad y la forma en la que nos va a afectar. No me gusta mucho la historia, prefiero entender las cosas que aprendérmelas de memoria, por eso mismo prefiero más un examen de matemáticas que uno de historia o geografía. Me gusta salir, conocer gente nueva, salir a jugar con mis amigos, ir al cine, disfrutar de una buena película o alguna serie que esté de moda, pero sobre todo disfruto de un buen partido de fútbol, ya sea de la copa de Europa o de la liga mexicana. Actualmente aprovecho mi tiempo libre para hacer ejercicio y estoy en un equipo de básquetbol por las noches. Mis áreas de interés son muchas, me gusta mucho aprender sobre las personas, la forma en que se comportan y cómo relacionarme con ellas, pues creo que lo más importante somos nosotros mismos y debemos aprender a relacionarnos. Me atrae también mucho la parte de la administración de empresas, aprender a ser un líder y saber manejar diferentes situaciones con problemas específicos para seguir mejorando la empresa o negocio. Me interesa mucho el aplicar la tecnología nueva para automatizar las operaciones o en situaciones de la vida cotidiana. Estaba estudiando Ingeniería Industrial y realmente creo que no satisface muchos de los campos que me gustaría ser un poco más experto, la parte humanista del trato con la persona no existe y el conocimiento de nuevas tecnologías no es tan específico como esperaba, sin embargo, la parte de liderazgo la he desarrollado, pues estoy actualmente trabajando como líder de proyectos pequeños en mis distintas materias. Creo que es importante tratar de abarcar los mayores campos posibles al momento de estudiar una carrera, pues es en donde nos dan la base para salir al mundo y empezar a trabajar o crear alguna empresa."
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
          consumption_preferences: true
        }, (err, watsonResp) => {
          if (err) return console.log('error:', err);
          
          res.json(watsonResp);
        }
    );
})

module.exports = router;