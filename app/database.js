const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sociosMongodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(db => console.log('Base de datos Conectada'))
  .catch(err => console.log(err));