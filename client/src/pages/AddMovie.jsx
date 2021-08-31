import React from 'react'
import { useMutation, gql } from '@apollo/client'
import { useForm } from "react-hook-form";
import { GET_MOVIES } from '../config/graphql'

  const ADD_CONTENT = gql`
  mutation createMovie(
    $title: String!
    $overview: String!
    $poster_path: String!
    $popularity: Float! 
    $tags: String
  ) {
    createMovie(
      title: $title
      popularity: $popularity
      overview: $overview
      poster_path: $poster_path 
      tags: $tags
    ) {
      _id
      title
      overview
      poster_path
      popularity
    }
  }
`;

export default function AddMovie() {

  const [createMovie, { data }] = useMutation(ADD_CONTENT)
  const { register, handleSubmit,  formState: { errors } } = useForm();

  const onSubmit = (e) => {
    
    createMovie({variables: { 
     title : e.title,
     popularity: +e.popularity,
     overview: e.overview,
     poster_path: e.poster_path, 
     tags: e.tags
    }, refetchQueries: [{query: GET_MOVIES}]})
    
  }
  return (
  <section id="add-section">
    <div className="container py-5">
      <div className="row px-3">
        <div className="col-lg-10 col-xl-9 card flex-row mx-auto px-0">
          <div className="img-left-register d-none d-md-flex"></div>

          <div className="card-body">
            <h4 className="title text-center mt-4">Add Movie</h4>
            <form 
            className="form-box px3"
            onSubmit={handleSubmit(onSubmit)}
            >
             <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">Title</span>
                <input 
                type="text" 
                className="form-control"
                // onChange={(e) => setNewMovie({ ...register, title: e.target.value})}
                {...register('title')}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">Image Url</span>
                <input 
                type="text" 
                className="form-control"
                // onChange={(e) => setNewMovie({ ...newMovie, poster_path: e.target.value})}
                {...register('poster_path')}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">Popularity</span>
                <input 
                type="number"
                step="any"
                className="form-control"
                {...register('popularity')}
                // onChange={(e) => setNewMovie({ ...newMovie, popularity: e.target.value})}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">Tags</span>
                <input 
                type="text" 
                className="form-control"
                // onChange={(e) => setNewMovie({ ...newMovie, tags: e.target.value})}
                {...register('tags')}
                />
              </div>
              <div className="input-group">
                <span className="input-group-text">Overview</span>
                <textarea 
                className="form-control" 
                aria-label="With textarea" 
                // onChange={(e) => setNewMovie({ ...newMovie, overview: e.target.value})}
                {...register('overview')}
                />
              </div>
              <div className="mb-3 warp-btn-add">
                <button type="submit" className="btn btn-block text-uppercase">
                  Success
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}
