import React, { useEffect } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import { useParams, useHistory } from 'react-router-dom'
import { favourite } from '../vars'
import { GET_MOVIES } from '../config/graphql'
export default function Details() {
  const { id } = useParams()
  const history = useHistory()
  
  
  const GET_MOVIE = gql`
    query getMovieId($_id: ID){
      selectedMovie(_id:$_id) {
        _id
        title
        overview
        poster_path
        popularity
        tags
      }
    } 
  `
  const DELETE_MOVIE = gql`
  mutation deleteMovie($_id: ID) {   
    deleteMovie(_id: $_id) {
      message
    }
  } 
  `
  
  const {loading , error, data } = useQuery(GET_MOVIE, {
    variables: { _id: id  }
    
  })
   
  console.log(data, 'dada')
  const [deleteMovie] = useMutation(DELETE_MOVIE);
  
  if (loading) return <p>Loading...</p>
  if (error) return <p>error...</p>

  const deleteSubmit = (_id) => {
    deleteMovie({variables: {_id}, refetchQueries: [{query: GET_MOVIES}]})
    history.push('/')
  }
  const addToFavourite = (e) => {
    e.preventDefault()
    const currentFavourite = favourite()
    favourite([...currentFavourite, data.selectedMovie])
    history.push('/favourite')
  }
  
  return (
    <div className="container-fluid" id="like-section">
        <div className="row" style={{background: "grey"}}>
          <div className="col-md-10 col-11 mx-auto">
            <div className="row mt-5 gx-3">
        
              <div className="col-md-12 col-lg-6 col-12 mx-auto main-like mb-lg-0 mb-5 shadow rounded-3">
                <div className="col-md-12 col-6 col-12 mx-auto main-like mb-lg-0 mb-5 shadow d-flex justify-content-center align-items-center">
                  <img src={data.selectedMovie.poster_path} className="img-fluid rounded-3" alt=""/>
                </div>
              </div>
          
          <div className="col-md-12 col-lg-12 col-11 mx-auto mt-lg-0 mt-md-5 py-4">
            <div className="right-side p-3 shadow bg-white rounded-3">
              <div className="d-flex justify-content-between">
                <h3>{data.selectedMovie.title}</h3>
                <div className="d-flex justify-content-around">
                <button className="btn btn1" onClick={() => {deleteSubmit(data.selectedMovie._id)}}><i className="fas fa-trash"></i></button>
                <button className="btn btn0"
                  onClick={addToFavourite}
                ><i className="fas fa-heart"></i></button>
                </div>
                
              </div>
              <div className="text-indiv d-flex py-2"> 
                <span><i className="fas fa-star-half">{(data.selectedMovie.popularity / 100).toFixed(1)}</i></span>
              </div>
              <div className="text-indiv d-flex">
                <p>{data.selectedMovie.overview}</p>            
              </div>
              <div className="text-indiv d-flex">
                {
                  data.selectedMovie.tags.map((tag) => {
                    return(
                    <span className="badge bg-secondary text-light px-4">{tag}</span>
                    )
                  })
                  
                }
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> 
   </div>
  )
}
