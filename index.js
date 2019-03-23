const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

var app = express();
app.set('view engine','ejs');
app.use('/assets',express.static('assets'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/',function(req,res){
    res.render('index');
})
app.post('/',function(req,res)
{   var title=req.body.search;
    var type=req.body.type;
    var result=req.body.result;
    var url='http://www.omdbapi.com/?apikey=e1be34&s='+title+'&type='+type+'&page='+result;
    console.log(url)
    request(url, function (error, response, body) 
    {
    if(error)
    {
        console.log(error);
    }
    else
    {
        var Data=JSON.parse(body);
        res.render('index',{Data:Data});
   
    }
})

});

app.listen(3000,function(){
    console.log('server up and running');
})
