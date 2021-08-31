import Heading from '../components/Heading'
import Movie from '../components/Movie'
import Series from '../components/Series'
// import Loader from 'react-loader-spinner'
import { useQuery, gql } from '@apollo/client'

export default function Home (){
    
  const GET_ENTERTAINME = gql`
    query{
      movies {
        _id
        title
        poster_path
      }
    series {
        _id
        title
        poster_path
    }
  }
    
  `
  
  const { loading, error, data } = useQuery(GET_ENTERTAINME)
   
  if (loading) return <p>Loading...</p>
  if (error) return <p>error...</p>
  return (
      
    <div className="container py-5 text-center">
     <Heading 
        header={data.movies[0].__typename}
     />
     {/* <div className="row">
        <p>{JSON.stringify(data)}</p> 
      </div>     */}
      <Movie
        movies={data.movies}
      />
      <Heading 
        header={data.series[0].__typename}
      /> 
      <Series 
        series={data.series}
      />
    </div>
  )
} 