var express=require('express');
var hbs=require('hbs');
var path=require('path');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');

var courseModel = require('./models/Course3'); // i.e. newsModel  = 'News' from mongoose.model('News',newsSchema);
var courseController = require('./controllers/course1');

mongoose.connect('mongodb://localhost:27017/course3');
mongoose.connection.on('error',function(){
    console.error('MongoDb is not connected. Check if Mongod is running.');
});

var app=express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','html');
app.engine('html',hbs.__express);
app.use(bodyParser());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded(
{
    extended:false
}));

app.use(express.static('public'));
//mongoose

app.get('/',courseController.createCourse);
app.post('/',courseController.startNewCollection);
app.get('/search',courseController.displayAllCourse);
//app.get('/display',courseController.);
//app.get('/:headline',newsController.deleteNewsByHead);

app.listen(3000);