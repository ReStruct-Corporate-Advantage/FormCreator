const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const cors = require('cors')

// const isDev = process.env.NODE_ENV !== 'production';
const app = express();
var corsOptions = {origin: '*', optionsSuccessStatus: 200,}

app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(pino);

app.post('/forms', (req, res) => {
  const jsonData = req.body
  console.log(jsonData)
  fs.appendFile("metadata/forms-meta-save.json", JSON.stringify(jsonData, null, 4), function(err) {
    if (err) {
        return res.json(err);
    }
    return res.json(jsonData)
  });
})

app.get('/attributes', (req, res) => {
  fs.readFile("metadata/attribute-repository.json", "utf8", function(err, data) {
    if (err) {
        return res.json(err);
    }
    return res.json(data)
  });
})

app.get('/forms', (req, res) => {
  fs.readFile("metadata/forms-meta.json", "utf8", function(err, data) {
    if (err) {
        return res.json(err);
    }
    return res.json(data)
  });
})

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);