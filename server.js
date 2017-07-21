const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

//hbs for rendering dynamic content
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear())
hbs.registerHelper('capitalizeText',(text) => text.toUpperCase())

//express middleware for rendering static content
app.use(express.static(__dirname + '/public'))

//express middleware
app.use((req,res,next)=>{
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  console.log(`${now}: ${req.method} ${req.url}`);
  fs.appendFile('server.log', log + '\n', (err) =>{
    if(err){
      console.log('Unable to append to server.log');
    }
  });
  next();
})

// app.use((req,res,next) =>{
//   res.render('maintanence.hbs')
// })

//registering Handlers with app.get()
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    message: 'Welcome to some page',
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
})



//registering port to listen to
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
