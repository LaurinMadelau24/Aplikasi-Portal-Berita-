require('dotenv').config();
const bodyParser = require('body-parser');
const { Console } = require('console');
const app = require('express')();

const PORT = process.env.PORT;

//swagger
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//     res.status(200).send("Hellow Word")
// })

//connect database
const db = require('../model/main');
const { version } = require('os');
db.sequelize
  .sync()
  .then(() => console.log('Sync db.'))
  .catch((err) => console.log('Failed: ' + err.message));



// Membuat spesifikasi Swagger
const apiDocumentation = require('../apidocs.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocumentation))

//include routes
require('../routes/News')(app);
require('../routes/User')(app);
require('../routes/Category')(app);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));

module.exports = app;
