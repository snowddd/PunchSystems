const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: '*',
};

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

var app = express();

// swagger
var swaggerUi = require('swagger-ui-express');
var swaggerJSDoc = require('swagger-jsdoc');
var swaggerDefinition = {
  info: {
    title: 'punchSystem Swagger API',
    version: '1.0.0',
    description: 'Swagger API docs',
  },
  host: 'localhost:5001',
  basePath: '/',

};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./routes/*.js'],
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

// serve swagger
app.get('/swagger.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(cors(corsOptions));
app.use(bodyParser.json());

require('./config/returnCode')(app);
require('./routes/login')(app);
require('./routes/profile')(app);
require('./routes/punch')(app);
require('./routes/punchRecords')(app);
require('./routes/leave')(app);
require('./routes/leaveRecords')(app);


app.listen(5001); //dedault port


console.log('punchSystem API server at port 5001 is running..')