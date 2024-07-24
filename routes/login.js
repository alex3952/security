var express = require('express');
var router = express.Router();

/* 1. Importe el módulo crypto */
let crypto = require('crypto');

/* 1. Cargue los modelos de acuerdo con la configuración de la conexión */
const sequelize = require('../models/index.js').sequelize;
var initModels = require("../models/init-models");
var models = initModels( sequelize );  


/* GET users listing. */
router.get('/', async function(req, res, next) {
  /* 3. Uso del método findAll */
 
  //res.send('respond with a resource');
  res.render('login');
});
    
 /* POST user. */
 /* 2. Cree el callback asíncrono que responda al método POST */
 router.post('/', async (req, res) => {

   /* 3. Desestructure los elementos en el cuerpo del requerimiento */
   let { username, password } = req.body;

   try {

     /* 4. Utilice la variable SALT para encriptar la variable password. */
     let salt = process.env.SALT
     let hash = crypto.createHmac('sha512', salt).update(password).digest("base64");
     let passwordHash = salt + "$" + hash

     const userMatch = await models.users.findOne({where: {name: username, password: passwordHash}})

     if(userMatch){
        res.redirect('/users')
     } else {res.redirect('/')}

     /* 6. Redireccione a la ruta con la vista principal '/users' */
     res.redirect('/users')

   } catch (error) {

     res.status(400).send(error)

   }

 })



module.exports = router;
