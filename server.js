

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) =>{
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
})

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));



hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
  // return 'test';
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) => { //request, response
  // res.send('<h1>Hello Express</h1>!');
  res.render('home.hbs', {
    pageTitle: 'ya durak',
    currentYear: new Date().getFullYear(),
    welcomeMessage: "where's the money, lebowski?!"
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page'
  })
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Error handling request'
  });
})

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'My projects',
    welcomeMessage: 'FUCK'
  });
})


app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
