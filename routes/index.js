var express = require('express');
var router = express.Router();
var userModel = require('../models/user');
var promenadeModel= require('../models/promenade');

var uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const fs = require('fs');

// const fileUpload = require('express-fileupload');
// router.use(fileUpload());

var cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'dg0flooxn',
  api_key: '656298461962811',
  api_secret: 'H5pBel985fgWQptdjdcWFX8xWv4'
});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signin', (req, res, next) => {
  console.log('signin is running...');
  userModel.findOne({
    email: req.query.email,
    // ON NE SOUHAITE PLUS CHECKER LE MOT DE PASSE EN CLAIR MAIS UNIQUEMENT L'EMAIL, ON DE-HASH ENSUITE
    // password: req.query.password
  }, (error, user) => {

    if (!user) {
      res.json({result: false, isUserExist: false});
    } else {

      // ON GENERE LE DE-HASHAGE
      var hash = SHA256(req.query.password + user.salt).toString(encBase64);

      // ON DE-HASH ET ON ENVOI LES INFORMATIONS AU FRONT EN CAS DE SUCCES
      if (hash === user.password) {
        res.json({result: true, isUserExist: true, user});
      } else {
        res.json({result: false, isUserExist: false});
      }
      
    }
  });
});


router.post('/upload', function(req, res, next) {
  var randomName = Math.floor(Math.random() * 1000000)
  var photoPath = `public/images/avatar-${randomName}.jpg`;
  var filename = req.files.avatar;
  console.log(filename)

     filename.mv(photoPath, function(err) {
       if (err){
         return res.status(500).send(err);
       }
  
        cloudinary.v2.uploader.upload(photoPath,
            function(error, result){
              console.log(result)
              const fs = require('fs');
              fs.unlinkSync(photoPath);
              res.json(result.secure_url);
            }
          )
        }
      )
  }
)



router.post('/signup', function(req, res, next) {
  console.log('Signup is running...');


  // CREATION DU SEL
  var salt = uid2(32);

  const newUser = new userModel({
    username : req.body.username,
    email: req.body.email,
    password: SHA256(req.body.password + salt).toString(encBase64),
    dog1:req.body.dog1,
    dog1gender:req.body.dog1gender,
    avatar:req.body.avatar,
    // CREATION ET ASSIGNATION DU TOKEN
    token: uid2(32),
    // ASSIGNATION DU SEL AU USER
    salt: salt,
    // HASHAGE ET SAUBEGARDE DU PASSWORD HASHE AVEC LE SEL

  });
  console.log("SALT", salt);
  console.log("newuser", newUser);

  newUser.save(function(error, user) {
    console.log("USER SAVED ---->", user)
    res.json({result: true, user});
  });
});

router.get('/list_promenade', function(req, res, next) {
  console.log('Promenadeslist Loading...');
  promenadeModel.find({}).populate('userId').exec(function(error, data) {
    if (error) {
      console.log(error);
    } else {
    res.json({result: true, data});
    console.log(data)
  }});

});

router.get('/mes_promenades', function(req, res, next) {
  console.log('MES Promenadeslist Loading...');
  promenadeModel.find({userId:req.query.userId}).populate('userId').exec(function(error, data) {
    if (error) {
      console.log(error);
    } else {
    res.json({result: true, data});
    console.log(data)
  }});

});
router.get('/select_promenade', function(req, res, next) {
  console.log('Select promenade Loading...');
  promenadeModel.findOne({_id:req.query._id}).populate('userId').exec(function(error, data) {
    if (error) {
      console.log(error);
    } else {
    res.json({result: true, data});
    console.log(data)
  }});

});

router.post('/add_promenade',function(req,res,next){
  console.log('Add promenade ing...');
  const newPromenade = new promenadeModel({
    userId:req.body.userId,
    ville:'Paris',
    cp:'75001',
    adress:req.body.adress,
    date: req.body.date,
    heure:'1h',
    duree: req.body.duree,
    warning:req.body.warning,
    message:[],
    latitude:123,
    longitude:123,
    participant:2,
    ditance:0.5,
    description:req.body.description
 
  });
  newPromenade.save(function(error, promenade) {
  console.log('PROMENADE SAVED',promenade)
    res.json({result: true, promenade});
  });
})


router.post('/dog', function(req, res, next) {
  userModel.findById(req.body.id, function(err, user) {
    user.dog.push({
      nom:req.body.nom,
      gender: req.body.gender,
      image:req.body.image
    })

    user.save(function(err, user) {
      if (err) {
        console.log(err);

      } else {
        console.log("newdog", user);
      }
    })
  })

  res.render('newdog');
});

module.exports = router;
