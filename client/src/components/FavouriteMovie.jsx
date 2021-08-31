import React from 'react'

export default function FavouriteMovie(props) {
  return (
    <div className="col-lg-3 text-center">
        <div className="card-content border-0 bg-light mb-2">
          <div 
          className="card-body" 
          >
            <img src={props.data.poster_path} className="img-fluid rounded" alt="" />
          </div>
        </div>
      </div>
  )
}
