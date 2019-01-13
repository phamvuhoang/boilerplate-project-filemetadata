'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
var multer = require('multer');
var upload = multer({dest: 'assets/'});

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

// I can submit a form that includes a file upload.
// The from file input field has the "name" attribute set to "upfile". We rely on this in testing.
// When I submit something, I will receive the file name and size in bytes within the JSON response
app.post('/api/fileanalyse', upload.single('upfile'), function(req, res, next) {
  if (req.file) {
    res.json({
      filename: req.file.originalname,
      filesize: req.file.size
    });
  }
  
  next('No file selected');
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
