var express=require('express');
var path=require('path');
var cookieParser=require('cookie-parser');
var bodyParser=require('body-parser');
var exphbs=require('express-handlebars');
var expressValidator=require('express-validator');
var flash=require('connect-flash');
var session=require('express-session');
var LocalStrategy=require('passport-local'),Strategy;
var mongo=require('mongo');
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/real_estate');
var db=mongoose.connection;
const hbs=require('hbs');
var router=express.Router();
var routes =require('./routes/user.js');
//var users=require('./routes/users');
var app=express();
var expressSession=require('express-session');






app.use(express.static(__dirname + '/views/css'));
app.use(express.static(__dirname + '/views/images'));
app.use(express.static(__dirname + '/views/fonts'));
app.use(express.static(__dirname + '/views/js'));

app.use(express.static(__dirname + '/public'));

//app.use(express.static('views/images'));

hbs.registerPartials(__dirname + '/views/partials')

//hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static(__dirname + '/views/front_end'));

app.set('views',path.join(__dirname,'views'));

app.set('view engine','hbs');

//app.use(express.static(__dirname + '/public/images/uploads'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));
app.use(flash());

app.use(session({
  secret:'keyboard cat',
  resave:false,
  saveUninitialized:true,
}))


const { check, validationResult } = require('express-validator');


//Connect Flash
app.use(flash());

app.use((req,res,next) =>{
res.locals.success_msg=req.flash('success_msg');
res.locals.error_msg=req.flash('error_msg');

next();
});



app.get('/index',function(req,res){
   res.render('index');
});




//Passport middleware

app.use('/',routes);
//app.use('./users',users);

app.set('port',(process.env.PORT|| 3000));
app.listen(app.get('port'),function(){
  console.log('Server started on port',+app.get('port'));
});
