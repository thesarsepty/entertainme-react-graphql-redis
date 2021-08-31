import React from 'react'
import { useHistory } from 'react-router-dom'

function ContentImage(props) {
  
  const history = useHistory()
    
    return ( 
      <div className="col-lg-3 text-center">
        <div className="card-content border-0 bg-light mb-2">
          <div 
          className="card-body" 
          onClick={() => {history.push(`/details/${props.data._id}`)}}
          >
            <img src={props.data.poster_path} className="img-fluid rounded" alt="" />
          </div>
          <div className="row">
            <div className="text-center details-font py-3 px-3">
              <h6 className="fw-bold">{props.data.title}</h6>
            </div>
          </div>
        </div>
      </div>
    ) 
  
}


export default ContentImage

