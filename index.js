var express = require('express');
var cors = require('cors');
require('dotenv').config()
var app = express();
const multer = require('multer')
const bodyParser = require('body-parser')
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
const upload = multer({ storage })
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  // get the uploaded file
  const file = req.file
  console.log('log from post request', req.body, req.files, req.file);
  // get the file size
  const size = file.size


  // get the file type

  const type = file.mimetype

  // get the file name

  const name = file.originalname


  return res.json({
    name, type, size
  })
})



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
