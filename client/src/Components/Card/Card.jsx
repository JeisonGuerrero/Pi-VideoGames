import React from 'react';
import { Link } from "react-router-dom";
import './Card.css';

function Card({ image, name, genre, id }) {
  return (
    <div className='DivPadreCard'>
        <Link to={`/detalle/${id}`} className='link'>
        <h2 className='Name'>{ name }</h2>
        <img className='img' src={ image } alt={ name } />
        <div className='DivGenre'>
            <h3 className='Genres'>Generos:</h3>
            {
        genre && genre.map((e, index) => <p classname= 'Gnr' key={index}>{e}</p>)
        }
        </div>
        </Link>
    </div>
  )
}

export default Card