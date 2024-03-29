// Create web server


const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
var http = require('http');

// connect to database
const db = require('../database/index.js');

// middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files
app.use(express.static(path.join(__dirname, '../client/dist')));

// routes
app.get('/comments', (req, res) => {
  db.getComments((err, data) => {
    if (err) {
      console.log('error retrieving comments');
      res.status(404).send();
    } else {
      console.log('retrieved comments');
      res.status(200).send(data);
    }
  });
});

app.post('/comments', (req, res) => {
  db.postComment(req.body, (err) => {
    if (err) {
      console.log('error posting comment');
      res.status(404).send();
    } else {
      console.log('posted comment');
      res.status(201).send();
    }
  });
});

app.delete('/comments', (req, res) => {
  db.deleteComment(req.body, (err) => {
    if (err) {
      console.log('error deleting comment');
      res.status(404).send();
    } else {
      console.log('deleted comment');
      res.status(204).send();
    }
  });
});

// create a webserver using http
var server  = http.createServer(app);
server.listen(PORT);

// app listen also rises a problem
// app.listen(PORT, () => console.log(`listening on port ${PORT}`));