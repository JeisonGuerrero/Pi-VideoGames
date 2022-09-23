import React from 'react'
import Card from '../Card/Card'

function Cards({ videogames }) {
  return (
    <div>
    {videogames.map((e) => {
        return (
            <div key={e.id}>
                <Card
                    name={e.name} 
                    image={e.image} 
                    genre={e.genre} 
                    id={e.id}
                />
            </div>
        )})
    }
    </div>
  )
}

export default Cards