const { ApolloServer, gql, ApolloError } = require('apollo-server');
const axios  = require('axios');
// const { responsePathAsArray } = require('graphql');
const Redis = require('ioredis')
const redis = new Redis()


const typeDefs = gql `
  type Movie {
    _id: ID 
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Series {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Message {
    message: String
  }

  type Query {
    selectedMovie(_id: ID): Movie
    selectedSeries(_id: ID): Series
    movies: [Movie]
    series: [Series]
  }

  type Mutation {
    createMovie(title: String, overview: String, poster_path: String, popularity: Float, tags: String) : Movie
    updateMovie(_id: ID, title: String, overview: String, poster_path: String, popularity: Float, tags: String) : Movie
    deleteMovie(_id: ID) : Message
    createSeries(title: String, overview: String, poster_path: String, popularity: Float, tags: String) : Series
    updateSeries(_id: ID, title: String, overview: String, poster_path: String, popularity: Float, tags: String) : Series
    deleteSeries(_id: ID) : Message
  }
`;

const resolvers = {
  Query: {
    movies: async () => {
      // caching condition
      const dataMovies = await redis.get('movies')
      if (dataMovies){
        // console.log(dataMovies, 'cache');
        return JSON.parse(dataMovies)
      } else {
        console.log('api');
        const res = await axios({
          url: 'http://localhost:4001/movies',
          method: 'GET'
        })
        console.log(res.data) 
        redis.set('movies', JSON.stringify(res.data))
        return res.data
      }
      
    }, 
  
    selectedMovie: async(_, args) => {
      // caching condition
      const dataMovie = await redis.get('movie')
      const check = JSON.parse(dataMovie)
      // console.log('chace')
      if(dataMovie && args._id === check._id){
        // console.log('cache', JSON.parse(dataMovie))
        return JSON.parse(dataMovie)
      } else {
        // console.log('api')
        const res = await axios({
          url: `http://localhost:4001/movies/${args._id}`,
          method: 'GET'
        })
        console.log(res.data[0], 'repos');
        redis.set('movie', JSON.stringify(res.data[0]))
        return res.data[0]
      }
      
    }, 
        
  //  SERIES
    series: async () => {
      // caching condition
      const dataSeries = await redis.get('series')
      if(dataSeries){
        // console.log('cache');
        return JSON.parse(dataSeries)
      } else {
        // console.log('api');
        const res = await axios({
          url: 'http://localhost:4002/series',
          method: 'GET'
        })
        redis.set('series', JSON.stringify(res.data))
        return res.data
      }
     
    },

    selectedSeries: async(_, args) => {
      // caching condition
      const dataOneSeries = await redis.get('oneSeries')
      const check = JSON.parse(dataOneSeries)
      if(dataOneSeries && args._id === check._id){
        // console.log('cache')
        return JSON.parse(dataOneSeries)
      } else {
        const res = await axios({
          url: `http://localhost:4002/series/${args._id}`,
          method: 'GET'
        })
        // console.log(res.data[0], 'repos');
        redis.set('oneSeries', JSON.stringify(res.data[0]))
        return res.data[0]
      }
      
    }, 
  }, 
  Mutation: {

    // MOVIE
    createMovie: async(_, args) => {
      const data = {
        title: args.title,
        overview: args.overview,
        poster_path: args.poster_path,
        popularity: args.popularity,
        tags: args.tags 
      }
      const res = await axios({
        url: 'http://localhost:4001/movies',
        method: 'POST',
        data: data
      })
      // console.log(res.data.ops[0].tags)
      redis.del('movies')
      redis.del('movie')
      return res.data.ops[0]
    },
    updateMovie: async(_, args) => {
      const data = {
        title: args.title,
        overview: args.overview,
        poster_path: args.poster_path,
        popularity: args.popularity,
        tags: args.tags 
      }
      const res = await axios({
        url: `http://localhost:4001/movies/${args._id}`,
        method: 'PUT',
        data: data
      })
      // console.log(JSON.parse(res.config.data), 'update')
      redis.del('movies')
      redis.del('movie')
      return JSON.parse(res.config.data)
    },
    deleteMovie: async(_, args) => {
      const res = await axios({
        url: `http://localhost:4001/movies/${args._id}`,
        method: 'DELETE',
      })
      redis.del('movies')
      redis.del('movie')
      return res.data
    },
    
    // SERIES
    createSeries: async(_, args) => {
      const data = {
        title: args.title,
        overview: args.overview,
        poster_path: args.poster_path,
        popularity: args.popularity,
        tags: args.tags 
      }
      const res = await axios({
        url: 'http://localhost:4002/series',
        method: 'POST',
        data: data
      })
      redis.del('series')
      redis.del('oneSeries')
      return res.data.ops[0]
    },
    updateSeries: async(_, args) => {
      const data = {
        title: args.title,
        overview: args.overview,
        poster_path: args.poster_path,
        popularity: args.popularity,
        tags: args.tags 
      }
      const res = await axios({
        url: `http://localhost:4001/series/${args._id}`,
        method: 'PUT',
        data: data
      })
      redis.del('series')
      redis.del('oneSeries')
      return JSON.parse(res.config.data)
    },
    deleteSeries: async(_, args) => {
      const res = await axios({
        url: `http://localhost:4001/series/${args._id}`,
        method: 'DELETE',
      })
      redis.del('series')
      redis.del('oneSeries')
      return res.data
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({url}) => {
  console.log(`gql running on ${url}`);
}) 