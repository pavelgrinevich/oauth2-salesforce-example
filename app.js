const express = require('express');
const config = require('config');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(config.get('port'), () => {
  console.log(`Express server listening on port ${config.get('port')}`);
});
