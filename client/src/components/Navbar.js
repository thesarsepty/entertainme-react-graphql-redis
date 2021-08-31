import React from 'react'
import { useHistory } from 'react-router-dom'

export default function Navbar() {
  const history = useHistory()

  return (
    <nav className="navbar sticky-top shadow navbar-dark bg-dark" >
        <div className="container-fluid">
          <a className="navbar-brand">Entertainme</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span><i className="fas fa-grip-horizontal"></i></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" 
                onClick={() => {history.push('/')}}
                >Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" 
                onClick={() => {history.push('/addMovie')}}
                >Add</a>
              </li>
              <li className="nav-item">
                <a className="nav-link"
                onClick={() => {history.push('/favourite')}}
                >Favourite</a>
              </li>
            </ul>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
    </nav>
  )
}
