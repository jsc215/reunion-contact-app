const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const http = require('http');


// express wired up
const app = express();

// API file for interacting with MongoDB
const api = require('./server/routes/api');

// parsers for posts
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// angular static files
app.use(express.static(path.join(__dirname, './dist')));

// api location
app.use('/api', api);

// angular assets and entry point
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

const cors = require('cors');

// set port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

app.use(cors());

server.listen(port, () => {
  console.log(`Running on port ${port}`);
});
