import React from 'react';
import { Link } from "react-router-dom";
import './Card.css';

function Card({ image, name, genres, id, rating }) {
  return (
    <div className='DivPadreCard'>
        <Link to={`/detalle/${id}`} className='link'>
        <h3 className='Name'>{ name }</h3>
        <img className='img' src={ image } alt={ name } />
        <div className='DivGenre'>
            <h4 className='Genres'>Generos:</h4>
            {
              genres && genres.map((e, index) => <p className= 'Gnr' key={index}>{e} </p>)
            }
        </div>
        <div className='DivRating'>
          <h4 className='Rating'>Rating:</h4>
          <p className= 'RatingNum'>{rating}</p>
        </div>
        </Link>
    </div>
  )
}

export default Card