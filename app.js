const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const session = require('express-session');
const errorHandler = require('errorhandler');
const rp = require('request-promise');
const querystring = require('querystring');
const config = require('./config');

const app = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
  extended: false 
}));
app.use(session({ 
  name: 'sid',
  secret: 'asdf',
  resave: false,
  saveUninitialized: false,
  cookie: { path: '/', httpOnly: true, maxAge: null }
}));

app.get('/', (req, res) => {

  if(!req.user) {
    // some happens...
  }

  res.render('index', {
    user: req.user,
  });
});

app.get('/login', (req, res) => {
  const params = {
    response_type: 'code',
    client_id: config.get('credentials:clientID'),
    redirect_uri: config.get('callbackURL'),
  };
  res.redirect(`${config.get('authorizeURL')}?${querystring.stringify(params)}`);
});

app.get('/callback', (req, res) => {
  const params = {
    grant_type: 'authorization_code',
    code: req.query.code,
    client_id: config.get('credentials:clientID'),
    client_secret: config.get('credentials:clientSecret'),
    redirect_uri: config.get('callbackURL'),
  };

  const options = {
    method: 'POST',
    uri: config.get('tokenURL'),
    body: querystring.stringify(params),
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
  };
 
  rp(options)
    .then((body) => {
      console.log(JSON.parse(body));
    })
    .catch((err) => {
      console.log(err);
    });

    res.redirect('/');
});

app.get('/logout', (req, res) => {
  // some happens...
  res.redirect('/');
});

app.use(express.static(path.join(__dirname, 'public')));

if (app.get('env') === 'development') {
  app.use(errorHandler());
}

app.listen(config.get('port'), () => {
  console.log(`Express server listening on port ${config.get('port')}`);
});
