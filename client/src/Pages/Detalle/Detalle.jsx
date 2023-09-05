import React from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getByIdVideogames, desmontarGame } from '../../Redux/Actions';
import './Detalle.css';

function Detalle() {
    const { id } = useParams();
    console.log("aca esta id ", id);

    const unGame = useSelector((state) => state.unVideogame);
    console.log("aca esta unGame ", unGame);
    const dispatch = useDispatch();
    
  useEffect(() => {
    dispatch(getByIdVideogames(id));
    return () => {
      dispatch(desmontarGame());
    };
  }, [dispatch, id]);
  return (
    <div>
        <div className='contenedor'>
          <div className='contenedorDetalle'>
            <img className='img' src={unGame.image} alt={unGame.name} />
            <h2>{unGame.name}</h2>
            <h3 className='span'>Generos:</h3>
            <span >
              {unGame.genres?.map((e) => <p className= 'Gnr'>{e} </p>)}

            </span>
            <h3 className='span'>Descripción:</h3>
            <p>{unGame.description}</p>
            <h3 className='span'>Fecha de lanzamiento:</h3>
            <p>{unGame.released}</p>
            <h3 className='span'>Rating:</h3>
            <p>{unGame.rating}</p>
            <h3 className='span'>Plataformas:</h3>
            <p>{unGame.platforms?.map((e) => 
              <p className= 'Gnr'>{e} </p>
              )}</p>
          </div>
        </div>
    </div>
    )}

export default Detalle