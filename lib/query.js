const querystring = require('querystring');
const rp = require('request-promise');

const credentials = {
	accessToken: null,
  instanceUrl: null,
  userID: null,
}

function setCredentials(init) {
  if (!(init.accessToken && init.instanceUrl && init.userID)) {
    throw new Error('Please, check credentials settings');
  }
  
  credentials.accessToken = init.accessToken;
  credentials.instanceUrl =init.instanceUrl;
  credentials.userID = init.userID;
}

function request(uri) {
  const options = {
    method: 'GET',
    uri: uri,
    headers: {
      'Authorization': 'Bearer ' + credentials.accessToken,
      'Content-Type': 'application/json'
    },
  };

  return rp(options)
    .then((result) => {
      return JSON.parse(result);
    });
}

function getUserInfo() {
  return request(credentials.userID);
}

function getContactList() {
  const url = `${credentials.instanceUrl}/services/data/v42.0/query/?`;
  const query = querystring.stringify({q: 'SELECT id, name FROM Contact'});

  return request(url + query);
}

function getContactInfo(recordID) {
  const url = `${credentials.instanceUrl}/services/data/v42.0/sobjects/`;
  const query = `contact/${recordID}`;

  return request(url + query);
}

module.exports.setCredentials = setCredentials;
module.exports.getUserInfo = getUserInfo;
module.exports.getContactList = getContactList;
module.exports.getContactInfo = getContactInfo;
