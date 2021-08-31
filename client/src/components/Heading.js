import React from 'react'

export default function Heading(props) { 
    return (
      // <div className="container py-5">
        <div className="row py-5">
          <div className="col-lg-5 m-auto text-center">
          <h1>List {props.header}</h1>
        </div>
        {/* <div className="col-12 text-center">
        </div> */}
      </div>
    // </div> 
    )
  
}

