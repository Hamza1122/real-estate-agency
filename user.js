var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var app = express();
var path=require('path');
const flash=require('flash');
const session=require('express-session');
const mongoose = require('mongoose');
const multer=require('multer');
var User=require('../models/User');
var Property=require('../models/Property');
var Agent_Info=require('../models/agent_info');
var Tax_Info=require('../models/tax_info');



const passport=require('passport');
mongoose.connect('mongodb://localhost:27017/real_estate');
const Sequelize=require('sequelize');
const Op=Sequelize.Op;
var db=mongoose.connection;

var Photo= require('../models/Photo');



db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})


router.get('/register',function(req,res){
   res.render('user_registration');
});


router.get('/agent_info',function(req,res){
   res.render('agent_info');
});




router.get('/search',function(req,res){
   res.render('search');
});



//function escapeRegex(text) {
  //  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
//};

//router.post("/search", function(req, res) {

  //  if (req.body.search) {
    //   const regex = new RegExp(escapeRegex(req.body.search), 'gi');
  //     User.find({ "name": regex }, function(err, foundjobs) {
    //       if(err) {
      //         res.render('user_login')
        //       console.log(err);
    //       } else {

      //        res.render('register')
        //       console.log(jobs);
  //         }
    //   });
  //  }
//})




//router.post('/search', (req, res, next) => {
  //  res.redirect('/search?q=' + req.body.q);
//});









router.get('/upload',function(req,res){
   res.render('upload');
});


router.get('/tax_info',function(req,res){
   res.render('tax_info');
});


router.get('/disp',function(req,res){
   res.render('disp');
});


router.get('/user_login',function(req,res){
   res.render('user_login');
});


router.get('/submit_property',function(req,res){
   res.render('submit_property');
});


router.post('/item_search',function(req,res){
    var search=req.body.search;

db.collection("stores").findOne({name: search},function(err, user){
    if(err){
      console.log("Error");
    }
else if(!user){
         res.redirect('/register');
    }
    else{
      var users ={
            "name":user.name,
             "description":user.description
}
console.log(users);

 res.render('user_login',{
    users:users
 });

}


});
});





router.post('/user_login',function(req,res){
    var username=req.body.username;
    var password=req.body.password;
db.collection("details").findOne({username: username  , password: password},function(err, user){
    if(err){
      console.log("Error");
    }
else if(!user){
         res.redirect('/register');
    }
    else{
 res.redirect('/submit_property');
}

})
});




router.post('/sign_up', function(req,res){
    var username = req.body.name;
    var email =req.body.email;
    var password = req.body.password;
    var phone =req.body.phone;

    var data = {
        "username": username,
        "email":email,
        "password":password,
        "phone":phone
    }
db.collection('details').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");

    });

    return res.redirect('/register');
})


const storage = multer.diskStorage({
  destination: './public/images/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});



// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('myImage');



// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}



//router.post('/upload', (req, res) => {
//  upload(req, res, (err) => {
  //  if(err){
    //  res.render('register', {
//        msg: err
  //    });
  //  } else {
    //  if(req.file == undefined){
  //      res.render('register', {
    //      msg: 'Error: No File Selected!'
  //      });
    //  } else {
  //      res.render('register', {
    //      msg: 'File Uploaded!',
      //    file: `uploads/${req.file.filename}`
  //      });
  //    }
  //  }
//  });
//});



router.post('/upload',upload,function(req,res){

   var imageFile=req.file.filename;
   var success=req.file.filename +  "upload Successfully";


   var fullPath = "files/"+req.file.filename;
               var document = {
                 path:     fullPath,
               };

               var photo = new Photo(document);
                        photo.save(function(error){
                          if(error){
                            throw error;
                          }
                          res.redirect('/?msg=1');
                       });


});






//agent add_property


router.post('/add_property',function(req,res){


  var property_status=req.body.property_status;
  var property_name=req.body.property_name;
  var property_id=req.body.property_id;
  var area=req.body.area;
  var price=req.body.price;
  var bedrooms=req.body.bedrooms
  var bath_room=req.body.bath_room;
  var description=req.body.description;
  var  property_address=req.body.property_address;
  var zip_code=req.body.zip_code;
  //var garden=req.body.garden;
//  console.log(garden);
  // var feature2=req.body.feature2;
  // var feature3=req.body.feature3;
  // var feature4=req.body.feature4;
  // var feature5=req.body.feature5;
  // var feature6=req.body.feature6;
  // var feature7=req.body.feature7;
  // var feature8=req.body.feature8;
  // var feature9=req.body.feature9;
  // var feature10=req.body.feature10;
  // var feature11=req.body.feature11;
  // var feature12=req.body.feature12;
  // var feature13=req.body.feature13;
  // var feature14=req.body.feature14;
  // var feature15=req.body.feature15;
  var city=req.body.city;
  var type=req.body.type;
  var status=req.body.status;

var data = new Property({
 property_status:"property_status",
 property_name:"property_name",
//  property_id:"property_id",
// area:"area",
// price:"price",
// bedrooms:"bedrooms",
// bath_room:"bath_room",
// description:"description",
// property_address:"property_address",
// zip_code:"zip_code",
// //"garden":garden,
// // "feature2":feature2,
// // "feature3":feature3,
// // "feature4":feature4,
// // "feature5":feature5,
// // "feature6":feature6,
// // "feature7":feature7,
// // "feature8":feature8,
// // "feature9":feature9,
// // "feature10":feature10,
// // "feature11":feature11,
// // "feature12":feature12,
// // "feature13":feature13,
// // "feature14":feature14,
// // "feature15":feature15,
// city:"city",
// property_type:"type",
// status:"status",
//

});

data.save(function(err){

  console.log("Saved");
if(err){
  console.log("Error");
}
});
    return res.redirect('/register');

})






router.post('/agent_info',function(req,res){


  var agent_id=req.body.agent_id;
  var agent_type=req.body.agent_type
  var agent_name=req.body.agent_name;
  var agent_title=req.body.agent_title;
  var agent_email=req.body.agent_email;
  var agent_experience=req.body.agent_experience;
  var agent_coutry=req.body.agent_country
  var agent_about_me=req.body.agent_about_me;
  var agent_address=req.body.agent_address;
  var email=req.body.email;
  var agent_city=req.body.agent_city;
  var agent_dob=req.body.agent_dob;

var agent_info = new Agent_Info({
 agent_name:"agent_name",
 // agent_title:"agent_title",
 // agent_email:"agent_email",
 // agent_experience:"agent_experience",
 // agent_coutry:"agent_coutry",
 // agent_about_me:"agent_about_me",
 // agent_address:"agent_address",
 // emai:"email",
 // agent_city:"agent_city",
 // agent_dob:"agent_dob",
});

//console.log(data)

agent_info.save(function(err){

  console.log("Agent_Info_Saved");
if(err){
  console.log("Error");
}
});
    return res.redirect('/register');

})












router.post('/tax_info',function(req,res){


  var first_name=req.body.first_name;
  var last_name=req.body.last_name;
  var country=req.body.country;
  var address=req.body.address;
  var state=req.body.state;
  var city=req.body.city;
  var tax=req.body.tax
  var tax_id=req.body.tax_id;

var tax_info = new Tax_Info({
 first_name:first_name,
 // agent_title:"agent_title",
 // agent_email:"agent_email",
 // agent_experience:"agent_experience",
 // agent_coutry:"agent_coutry",
 // agent_about_me:"agent_about_me",
 // agent_address:"agent_address",
 // emai:"email",
 // agent_city:"agent_city",
 // agent_dob:"agent_dob",
});

//console.log(data)

tax_info.save(function(err){

  console.log("Tax_Info_Saved");
if(err){
  console.log("Error");
}
});
    return res.redirect('/register');

})














module.exports = router;
