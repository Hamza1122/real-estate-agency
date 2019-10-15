var express=require('express');
var path=require('path');
var cookieParser=require('cookie-parser');
var bodyParser=require('body-parser');
var exphbs=require('express-handlebars');
var expressValidator=require('express-validator');
var flash=require('connect-flash');
var session=require('express-session');
var passport=require('passport');
var LocalStrategy=require('passport-local'),Strategy;

//var mongo=require('mongo');
//var mongoose=require('mongoose');
//mongoose.connect('mongodb://localhost/pictures');
//var db=mongoose.connection;
const hbs=require('hbs');
var router=express.Router();

//var users=require('./routes/users');
var app=express();



hbs.registerPartials(__dirname + '/views/partials')

app.use(express.static(path.join(__dirname + '/public')));


app.set('views',path.join(__dirname,'views'));

app.set('view engine','hbs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));
app.use(flash());

var agent =require('./routes/user_registration.js');

//var user_registration =require('./routes/agent/user_registration.js');



app.use('/',router);

app.use('/user_agent',agent);


//app.use('/agent/user_registration',user_registration);





app.get('/',(req, res) => {
  res.render('user_agents.hbs',{
  });
});






//app.use('./users',users);

app.set('port',(process.env.PORT|| 3000));
app.listen(app.get('port'),function(){
  console.log('Server started on port',+app.get('port'));
});
