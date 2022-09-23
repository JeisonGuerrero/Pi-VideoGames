import React from 'react'

function Card({ image, name, genre }) {
  return (
    <div>
        <span>Nombre:</span>
        <h2>{ name }</h2>
        <img src={ image } alt={ name } />
        <div>
            <span>Generos:</span>
            {
        genre && genre.map((e, index) => <p key={index}>{e}</p>)
        }
        </div>
    </div>
  )
}

export default Card