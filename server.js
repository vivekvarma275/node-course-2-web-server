const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine', 'hbs');


app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=>{
        if(err){
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next)=>{
//     res.render('maintenance');
// });

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});

// root/index ROUTE
app.get('/', (req, res)=>{
    res.render('home', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the Home page!'
    });
});

// about ROUTE
app.get('/about', (req, res)=>{
    res.render('about', {
        pageTitle: 'About Page'
    });
});

// handle bad requests
app.get('/bad', (req, res)=>{
    res.send({
        errorMessage: 'Unable to fulfill this request'
    });
});

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
});