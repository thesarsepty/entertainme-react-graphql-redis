import React from 'react'
import ContentImage from './ContentImage'

function Series (props) {
    return (
      // <div className="container">
      <div className="row">
            {
          props.series.map((content) => {
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

export default Series