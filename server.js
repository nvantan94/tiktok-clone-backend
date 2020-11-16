import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import dbVideos from './dbModel.js';

const app = express();
dotenv.config();
const port = process.env.PORT

app.use(express.json())
app.use(cors())

const mongodb_password = process.env.MONGODB_PASSWORD
const connection_url = `mongodb+srv://admin:${mongodb_password}@cluster0.jvazg.mongodb.net/tiktokdb?retryWrites=true&w=majority`

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

app.get('/', (req, res) => 
  res.status(200).send('Welcome to tiktok backend server')
);

app.post('/videos', (req, res) => {
  const dbVideos = req.body

  dbVideos.create(dbVideos, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(201).send(data);
    }
  })
});

app.get('/videos', (req, res) => {
  dbVideos.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  })
});

app.listen(port, () => 
  console.log(`listening on port: ${port}`));



