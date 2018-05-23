const http = require('http'),
      express = require('express'),
      bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/', require('./routes'));

const server = app.listen( process.env.PORT || 3000, () => 
    console.log('Listening on port ' + server.address().port)
);