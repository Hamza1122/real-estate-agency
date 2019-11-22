var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var passport = require("passport");
const flash=require('connect-flash');
const session=require('express-session');
var app = express();
const cookieSession=require('cookie-session');
const multer=require('multer');
const bcrypt=require('bcrypt');
const aysnc=require('async');
const crypto=require('crypto');

const { check, validationResult } = require('express-validator');


var path=require('path');



mongoose.connect('mongodb://localhost:27017/real_estate');
const Sequelize=require('sequelize');
const Op=Sequelize.Op;
var db=mongoose.connection;
var passportLocalMongoose=require("passport-local-mongoose");

require('../config/passport')(passport);
const User=require('../models/user');
var Property=require('../models/Property');
var Agent_Info=require('../models/agent_info');
var Tax_Info=require('../models/tax_info');
var Contact_Us=require('../models/Contact_Us');
var User_Reviews=require('../models/user_reviews');

var Photo= require('../models/Photo');


const cookieParser = require('cookie-parser');





//app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


//app.use(passport.initialize())
app.use(flash());


db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})





router.get('/services_detail',function(req,res){
   res.render('services_detail');
});


//
// router.get('/property',function(req,res){
//    res.render('property');
// });


//
// router.post('/user_registration',function(req,res){
//
// var passowrd=req.body.password;
// var name=req.body.name
// bcrypt.hash(req.body.email,10,(err,hash) =>{
//
//   if(err){
//       return res.status(500).json({
//       error:err
//
//  });
// }else{
//
//   const user= new User({
//     _id:new mongoose.Types.ObjectId(),
//     name:name,
//    email:req.body.email,
//    password:hash
//  });
//  user.save(function(err){
//
//   console.log("Data Inserted Successfully");
//
//   if(err){
//     conole.log("Error");
//   }
//   return res.redirect('/user_login');
//
//  })
// }
// });
//
//
//
// });









router.post('/user_registration',function(req, res){
  const { name, email, password} = req.body;
  let errors = [];

  if (password.length < 4) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      password,
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.redirect('register')
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});



















router.get('/login',function(req,res){
   res.render('user_login');
});


router.get('/register',function(req,res){
   res.render('user_registration');
});




router.post('/login',passport.authenticate('local', { failureRedirect: '/index' }),
  function(req, res) {
    res.redirect('/reviews');
  //  res.redirect('/success?username='+req.user.username);
  });





router.get('/services',function(req,res){
   res.render('services');
});




router.get('/index',function(req,res){
   res.render('index');
});



router.get('/faq',function(req,res){
   res.render('faq');
});


router.get('/review',function(req,res){
   res.render('review');
});



router.get('/about',function(req,res){
   res.render('about');
});




router.get('/agent_info',function(req,res){
   res.render('agent_info');
});

router.get('/contact',function(req,res){
   res.render('contact');
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




router.get('/pricing',function(req,res){
   res.render('pricing');
});


// router.get('/property_agents',function(req,res){
//    res.render('property_agents');
// });






router.get('/tax_info',function(req,res){
   res.render('tax_info');
});


router.get('/no_property',function(req,res){
   res.render('no_property');
});



router.get('/disp',function(req,res){
   res.render('disp');
});



router.get('/submit_property',function(req,res){
   res.render('submit_property');
});




//
// router.get('/testing_file', function(req, res){
// 	Property.find({}, function(err, allDetails){
// 		if(err) res.json(err);
// 		else    res.render('testing_file', {details: allDetails});
// 	});
// });




router.get('/property_agents', function(req, res){
	Agent_Info.find({}, function(err, allDetails){
		if(err) res.json(err);
		else    res.render('property_agents', {details: allDetails});
	}).limit(2);
});



router.get('/property', function(req, res){
	Property.find({}, function(err, allDetails){
		if(err) res.json(err);
		else    res.render('property', {details: allDetails});
	}).limit(6);
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











router.post('/property_submission',function(req,res){
  var status=req.body.status;
  var type=req.body.type;
  var location=req.body.location;
  var state=req.body.state;
  var city=req.body.city;
  var beds=req.body.beds;
  var bath_room=req.body.bath;


  Property.find({$and:([{bath_room:bath_room},{bedrooms:beds}])},function(err, user){
//db.collection("properties").findOne({bath_room:bath_room},function(err, user){
    if(err){
      console.log("Error");
    }
else if(!user){
         res.redirect('/no_property');
    }
    else{
//       var users ={
//             "bath_room":user.bath_room,
//             "zip_code":user.zip_code
// }

//console.log(users);

 res.render('post_property',{
    user:user
 });

console.log(user);
}


});
});





//
// router.post('/user_login',function(req,res){
//     var username=req.body.username;
//     var password=req.body.password;
// db.collection("details").findOne({username: username  , password: password},function(err, user){
//     if(err){
//       console.log("Error");
//     }
// else if(!user){
//          res.redirect('/register');
//     }
//     else{
//  res.redirect('/submit_property');
// }
//
// })
// });
//
//









router.post('/sign_up', [
check('password').isLength({ min: 5 })
],function(req,res){
    var username = req.body.name;
    var email =req.body.email;
    var password = req.body.password;
    var phone =req.body.phone;
const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(422).json({ errors: errors.array() });
  //  console.log("Errors");
  // }
if(errors){
  req.session.errors = errors;
  res.redirect('/register')
}
else{
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

    return res.redirect('/user_login');
}
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



// router.post('/upload',upload,function(req,res){
//
//    var imageFile=req.file.filename;
//    var success=req.file.filename +  "upload Successfully";
//
//
//    var fullPath = "files/"+req.file.filename;
//                var document = {
//                  path:     fullPath,
//                };
//
//                var photo = new Photo(document);
//                         photo.save(function(error){
//                           if(error){
//                             throw error;
//                           }
//                           res.redirect('/?msg=1');
//                        });
//
// });
//








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


router.post('/add_property',upload,function(req,res){



var imageFile=req.file.filename;
  var success=req.file.filename +  "upload Successfully";
  var fullPath = "images/uploads/"+req.file.filename;
              var document = {
                path:     fullPath,
              };

              // var photo = new Photo(document);
              //          photo.save(function(error){
              //            if(error){
              //              throw error;
              //            }
              //            res.redirect('/?msg=1');
              //         });
              //

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

  var status=req.body.status;
var property_type=req.body.property_type;
var city_name=req.body.city_name;
var state=req.body.state;
var country=req.body.country;
var master_bed=req.body.master_bed;
var kitchen=req.body.kitchen;
var dining=req.body.dining;
var baths=req.body.baths;
var storage=req.body.storage;

var data = new Property({
 property_status:property_status,
 property_name:property_name,
property_id:property_id,
area:area,
price:price,
bedrooms:bedrooms,
bath_room:bath_room,
description:description,
property_address:property_address,
zip_code:zip_code,
 path:fullPath,
 status:status,
 property_type:property_type,
 city_name:city_name,
 state:state,
 country:country,
 master_bed:master_bed,
 kitchen:kitchen,
 dining:dining,
 baths:baths

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


  var agent_name=req.body.agent_name;
  var agent_title=req.body.agent_title;
  var agent_email=req.body.agent_email;

  var agent_about_me=req.body.agent_about_me;
  var agent_address=req.body.agent_address;


  //var email=req.body.email;
  var agent_city=req.body.agent_city;
  var agent_dob=req.body.agent_dob;

  var agent_id=req.body.agent_id;
  var agent_type=req.body.agent_type


  var agent_age=req.body.agent_age;
  var agent_experience=req.body.agent_experience;
  var agent_country=req.body.agent_country;



var agent_info = new Agent_Info({
 agent_name:agent_name,
 agent_title:agent_title,
 agent_email:agent_email,
 //agent_experience:agent_experience,
 //agent_country:agent_country,
 agent_about_me:agent_about_me,
 agent_address:agent_address,
 //email:email,
 agent_city:agent_city,
 agent_dob:agent_dob,
   agent_id:agent_id,
 agent_type:agent_type,
  agent_age:agent_age,
 agent_experience:agent_experience,
 agent_country:agent_country,




});

console.log(agent_info);

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
 last_name:last_name,
 country:country,
 address:address,
 state:state,
 city:city,
 tax:tax,
 tax_id:tax_id,
 // tax_info:"agent_dob",
});

console.log(tax_info);

tax_info.save(function(err){

  console.log("Tax_Info_Saved");
if(err){
  console.log("Error");
}
});
    return res.redirect('/register');

});






router.post('/contact_us',function(req,res){


  var firstname=req.body.firstname;
  var email=req.body.email;
  var site_link=req.body.site_link;
  var subject=req.body.subject;
  var message=req.body.message;

var contact_us = new Contact_Us({
 firstname:firstname,
 email:email,
 site_link:site_link,
 subject:subject,
 message:message


});

console.log(contact_us);

contact_us.save(function(err){

  console.log("Conatct_Us_Saved");
if(err){
  console.log("Error");
}
});
    return res.redirect('/register');

})









router.post('/user_reviews',function(req,res){


  var firstname=req.body.firstname;
  var email=req.body.email;
  var comments=req.body.comments;

var contact_us = new User_Reviews({
 firstname:firstname,
 email:email,
 comments:comments

});
contact_us.save(function(err){

  console.log("Reviews_Saved");
if(err){
  console.log("Error");
}
});
    return res.redirect('/review');

})






router.post('/test', [
  check('name',"Invalid Name").isLength({ min: 3 }),
  check('email',"Invalid email").isEmail(),
  check('age',"Invalid Age").isNumeric()
], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    //return res.status(422).json({ errors: errors.array() })
    req.session.errors=true;
    req.session.success=false;
  //res.redirect('/testing_file');
//return res.status(422).json({ errors: errors.array() })
res.redirect('testing_file');
  }
else{


  const name  = req.body.name;
  const email = req.body.email;
  const age   = req.body.age;
res.redirect('index');
}

})



router.get('/testing_file',function(req,res){

res.render('testing_file',{

   title:'Form Validation',
   success:false,
   errors:req.session.errors


});
req.session.erros=null;


});









module.exports = router;
