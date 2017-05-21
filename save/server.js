'use strict';

const express  = require('express');
var bodyParser = require('body-parser');

// Constants
const PORT = 7331;

// App
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.send('Hello world coucojdkjbjku\n');
});
app.use(require('./routes/index'));


app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
