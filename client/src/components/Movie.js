import React from 'react'
import ContentImage from './ContentImage'

function Movie (props) {
    return (
      // <div className="container">
      
      <div className="row">
        {
          props.movies.map((content) => {
            return(
              <ContentImage 
                data={content}
                key={content._id}
              />
            )
          })
        }
          
      </div>
    // </div> 
    )
}

export default Movie