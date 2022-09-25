import React from 'react'
import './Card.css'

function Card({ image, name, genre }) {
  return (
    <div className='DivPadreCard'>
        <h2 className='Name'>{ name }</h2>
        <img className='img' src={ image } alt={ name } />
        <div className='DivGenre'>
            <h3 className='Genres'>Generos:</h3>
            {
        genre && genre.map((e, index) => <p classname= 'Gnr' key={index}>{e}</p>)
        }
        </div>
    </div>
  )
}

export default Card