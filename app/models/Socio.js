const { model , Schema} = require('mongoose')

const nouSociSchema = new Schema({
  nombre : {
    type: String,
    required: true
  },
  apellido : {
    type: String,
    required: true
  },
  direccion : {
    type: String,
    required: true
  },
  codPostal : {
    type: String,
    required: true
  },
  poblacion : {
    type: String,
    required: true
  },
  provincia : {
    type: String,
    required: true
  },
  telefono : {
    type: String,
    required: true
  },
  movil : {
    type: String,
    required: true
  },
  emaildp : {
    type: String,
    required: true
  },
})

// module.exports = model('Task', newTaskSchema);
module.exports = model('Socio', nouSociSchema);