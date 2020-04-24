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

app.get('/attributesMeta', (req, res) => {
  fs.readFile("metadata/attributeCreateMetadata.json", "utf8", function(err, data) {
    if (err) {
        return res.json(err);
    }
    return res.json(data)
  });
})

app.post('/attributes', (req, res) => {
  fs.readFile("metadata/attribute-repository.json", "utf8", function(err, data) {
    if (err) {
        return res.json(err);
    } else {
      let mainDataAsJson;
      const jsonData = req.body;
      const key = jsonData && jsonData.general_displayName;
      if (data) {
        mainDataAsJson = JSON.parse(data)
        let attributes = mainDataAsJson.attributes;
        if (!attributes) {
          mainDataAsJson.attributes = attributes = {}
        } else {
          if(!Object.keys(attributes).every(existingKey => existingKey !== key)) {
            res.statusMessage = "Duplicate Name, please choose another name for the attribute!"
            res.status(400).end();
            return;
          }
        }
        attributes[key] = jsonData
      } else {
        mainDataAsJson = {}
        mainDataAsJson.attributes = {}
        mainDataAsJson.attributes[key] = jsonData
      }
      fs.writeFile("metadata/attribute-repository.json", JSON.stringify(mainDataAsJson, null, 4), function(err, data) {
          if (err) {
              return res.json(err);
          }
          return res.json(jsonData)
      });
    }
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