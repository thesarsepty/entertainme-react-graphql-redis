import React from 'react'
import FavouriteMovie from '../components/FavouriteMovie'
import { favourite } from '../vars'

export default function Favourite() {
  const getFavourite = favourite()
  
  return (
    <div className="row">
        {
          getFavourite.map((myFavourite) => {
            return(
              <FavouriteMovie 
                data={myFavourite}
                key={myFavourite._id}
              />
            )
          })
        }
          
   </div>
      // <h1>{JSON.stringify(getFavourite)}</h1>
  )
}
