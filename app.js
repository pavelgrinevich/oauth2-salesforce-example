const path = require('path');
const express = require('express');
const errorhandler = require('errorhandler');
const session = require('express-session');
const config = require('./config');
const OAuth = require('./lib/oauth');
const query = require('./lib/query');

const app = express();
const oauth = new OAuth({
  callbackURL = config.get('callbackURL'),
  authorizeURL = config.get('authorizeURL'),
  tokenURL = config.get('tokenURL'),
  clientID = config.get('credentials:clientID'),
  clientSecret = config.get('credentials:clientSecret'),
});

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(session({ 
  name: config.get('session:name'),
  secret: config.get('session:secret'),
  resave: config.get('session:resave'),
  saveUninitialized: config.get('session:saveUninitialized'),
  cookie: config.get('session:cookie'),
}));
app.use(oauth.checkAuthorize('/login'));

app.get('/', (req, res) => {
  const user = query.getUserInfo();
  const contactList = query.getContactList();
  res.render('index', {
    page: 'index',
    user: user,
    contactList: contactList,
  });
});

app.get('/login', (req, res) => {
  res.render('index', {
    page: 'login',
  });
});

app.get('/contact:id', (req, res) => {
  const contactList = query.getContactInfo();
  // something
});

app.get('/authorize', oauth.requestAuthorize());

app.get('/callback', oauth.getAccessToken(), (req, res) => {
  query.setCredentials({
    accessToken: req.session.accessToken.access_token,
    instanceUrl: req.session.accessToken.instance_url,
    userId: req.session.accessToken.id,
  });
  res.redirect('/');
});

app.get('/logout', oauth.logout(), (req, res) => {
  res.redirect('/');
});

app.use(express.static(path.join(__dirname, 'public')));

app.use((err, req, res, next) => {
  if (app.get('env') === 'development') {
    errorhandler(err, req, res, next);
  } else {
    res.send(500);
  }

});

app.listen(config.get('port'), () => {
  console.log(`Express server listening on port ${config.get('port')}`);
});
