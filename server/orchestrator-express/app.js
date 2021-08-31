const express = require('express')
const app = express()
const axios = require('axios')
const port = process.env.PORT || 4000
const Redis = require('ioredis')
const redis = new Redis()
const moviesApi = 'http://localhost:4001/movies'
const seriesApi = 'http://localhost:4002/series'

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/movies', async (req, res) => {
  try {
    const dataMovies = await redis.get('movies')
    if(dataMovies){
      // console.log('cache');
      res.status(200).json(JSON.parse(dataMovies))
    } else {
      // console.log('api');
      axios({
        method: 'GET',
        url: moviesApi
      })
      .then(({data}) => {
        redis.set('movies', JSON.stringify(data))
        res.status(200).json(data)
      })  
      .catch(err => {
        console.log(err);
      })  
    }
        
  } catch (error) {
    console.log(error);
  }
})

app.get('/moviesById', async (req, res) => {
  try {
    const { id } = req.params.id
    const dataMovies = await redis.get('moviesById')
    console.log(id);
    if(dataMovies){
      console.log('cache');
      res.status(200).json(JSON.parse(dataMovies))
    } else {
      console.log('api');
      axios({
        method: 'GET',
        url: moviesApi + `/${id}`
      })
      .then(({data}) => {
        
        // redis.set('moviesById', JSON.stringify(data))
        // res.status(200).json(data)
      })  
      .catch(err => {
        console.log(err);
      })  
    }
        
  } catch (error) {
    console.log(error);
  }
})

app.post('/movies', async (req, res) => {
  try {
      const { title, overview, poster_path, popularity, tags } = req.body
      axios({
        method: 'POST',
        url: moviesApi,
        data: {
          title,
          overview,
          poster_path,
          popularity,
          tags: [tags]
        }
      })
      .then(({data}) => {
        redis.del('movies')
        res.status(201).json(data)
      })  
      .catch(err => {
        console.log(err);
      })  
   
        
  } catch (error) {
    console.log(error);
  }
})
 
app.listen(port, () => {
  console.log(`orchestrator-express run on : ${port}`)
})