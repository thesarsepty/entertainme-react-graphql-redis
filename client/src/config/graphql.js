import { useQuery, gql } from '@apollo/client'



export const GET_MOVIES = gql`
    query{
      movies {
        _id
        title
        poster_path
      }
    }`