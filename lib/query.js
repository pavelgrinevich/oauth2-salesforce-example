const querystring = require('querystring');
const rp = require('request-promise');

const credentials = {
	accessToken: null,
  instanceUrl: null,
  userId: null,
}


function setCredentials() {

}

function getUserInfo() {

}

function getContactList() {
  
}


function getContactInfo() {
  
}

/*app.get('/callback', (req, res, next) => {
  
  const userOptions = {
   method: 'GET',
   uri: body.id,
   headers: {
     'Authorization': 'Bearer ' + body.access_token,
     'Content-Type': 'application/json'
   },
 };

 url = 'https://ap5.salesforce.com/services/data/v42.0/query/?';
 const query = querystring.stringify({q: 'SELECT id, name FROM Contact'});
 const otherOptions = {
   method: 'GET',
   uri: (url + query),
   headers: {
     'Authorization': 'Bearer ' + body.access_token,
     'Content-Type': 'application/json'
   },
 };
 Promise.all([rp(userOptions), rp(otherOptions)])
   .then((results) => {
     req.session.user = results[0];
     req.session.contactList = results[1];
     res.redirect('/');
   })
   .catch((err) => {
     next(err);
   });
});*//
