import express from 'express';
import bodyParser from 'body-parser';
import mongodb from 'mongodb'
const { MongoClient } = mongodb;

import DatabaseHandlers from './DatabaseHandlers.js'

const app = express();
const PORT = 9000;
const MONGO_URL = 'mongodb://localhost:27017'

app.use(function (req, res, next) {
  console.log({
    URL: req.url,
    TIME: new Date().toUTCString()
  });
  next();
});

app.use(bodyParser.json());

app.use((err, req, res, next) => {
  if (err) {
    console.log('Invalid Request Data')
    return res.send('Invalid Request Data')
  } else {
    next()
  }
});

MongoClient.connect(MONGO_URL, (err, client) => {
  if (err) return console.log(err);

  // https://stackoverflow.com/questions/15604848/express-js-this-undefined-after-routing-with-app-get)!
  const handlers = new DatabaseHandlers(client.db('btrtest'));

  app.get('/getAllDocuments', handlers.getAllDocuments.bind(handlers));
  app.post('/deleteOne', handlers.deleteOne.bind(handlers));
  app.post('/insertOne', handlers.insertOne.bind(handlers));
  app.post('/filterByProperty', handlers.filterByProperty.bind(handlers));

  app.listen(PORT, () => console.log(`sequence_svc listening on port ${PORT}`)); 
})