import React from 'react'

export default function UpdateMovie() {
  return (
    <section id="add-section">
    <div className="container py-5">
      <div className="row px-3">
        <div className="col-lg-10 col-xl-9 card flex-row mx-auto px-0">
          <div className="img-left-register d-none d-md-flex"></div>

          <div className="card-body">
            <h4 className="title text-center mt-4">Update Movie</h4>
            <form 
            className="form-box px3"
            
            >
             <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">Title</span>
                <input 
                type="text" 
                className="form-control"
                // onChange={(e) => setNewMovie({ ...register, title: e.target.value})}
                
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">Image Url</span>
                <input 
                type="text" 
                className="form-control"
                // onChange={(e) => setNewMovie({ ...newMovie, poster_path: e.target.value})}
                
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">Popularity</span>
                <input 
                type="number"
                step="any"
                className="form-control"
               
                // onChange={(e) => setNewMovie({ ...newMovie, popularity: e.target.value})}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">Tags</span>
                <input 
                type="text" 
                className="form-control"
                // onChange={(e) => setNewMovie({ ...newMovie, tags: e.target.value})}
                
                />
              </div>
              <div className="input-group">
                <span className="input-group-text">Overview</span>
                <textarea 
                className="form-control" 
                aria-label="With textarea" 
                // onChange={(e) => setNewMovie({ ...newMovie, overview: e.target.value})}
                
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
