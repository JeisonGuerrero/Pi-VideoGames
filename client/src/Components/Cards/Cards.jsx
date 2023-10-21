import React from 'react'
import Card from '../Card/Card'
import './Cards.css'

function Cards({ videogames }) {
  return (
    <div className='DivPadreCards'>
    {videogames.map((e) => {
        return (
          <div key={e.id}>
                <Card 
                    name={e.name} 
                    image={e.image} 
                    genres={e.genres?.map(e => typeof (e) === 'object' ? e.name : e)}  
                    id={e.id}
                    rating={e.rating}
                    />
            </div>
        )})
      }
    </div>
  )
}

export default Cards