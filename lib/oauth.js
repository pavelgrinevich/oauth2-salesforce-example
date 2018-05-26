const querystring = require('querystring');
const rp = require('request-promise');

module.exports = class {
  constructor(init) {
    this.init = init;
    
    if (
      !(this.init.callbackURL
      && this.init.authorizeURL
      && this.init.tokenURL
      && this.init.clientID
      && this.init.clientSecret)
    ) {
      throw new Error('Please, check authorization settings');
    }
  }

  checkAuthorize(path) {
    return (req, res, next) => {
      if (!path) next(new Error('There is no "authorization path" parameter'))
      else {
        if (!req.session.auth) {
          res.redirect(path);
        }
      }
      next();
    }
  }

  requestAuthorize(req, res, next)  {
    const params = {
      response_type: 'code',
      client_id: this.init.clientID,
      redirect_uri: this.init.callbackURL,
    };
    res.redirect(`${this.init.authorizeURL}?${querystring.stringify(params)}`);
  }
  
  getAccessToken(req, res, next)  {
    const query = {
      grant_type: 'authorization_code',
      code: req.query.code,
      client_id: this.init.clientID,
      client_secret: this.init.clientSecret,
      redirect_uri: this.init.callbackURL,
    };
  
    const options = {
      method: 'POST',
      uri: this.init.tokenURL,
      body: querystring.stringify(query),
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
    };
   
    rp(options)
      .then((body) => {
        req.session.auth = true;
        req.session.accessToken = JSON.parse(body);
        next();
      })
      .catch((err) => {
        next(err);
      });
  }
  
  logout(req, res, next)  {
    req.session.destroy();
    next();
  }
}
