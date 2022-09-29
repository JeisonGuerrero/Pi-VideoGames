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
    console.log("aca esta unGame ", unGame.genre);
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
            <span className='span'>Nombre:</span>
            <h2>{unGame.name}</h2>
            <span className='span'>Generos:</span>
            <span >
              {/* {unGame.genre.filter((e) => { 
                return (
              <p className= 'Gnr'>{e.name}</p>
              )}
              )} */}

            </span>
            <span className='span'>Descripción:</span>
            <p>{unGame.description}</p>
            <span className='span'>Fecha de lanzamiento:</span>
            <p>{unGame.released}</p>
            <span className='span'>Rating:</span>
            <p>{unGame.rating}</p>
            <span className='span'>Plataformas:</span>
            {/* <p>{unGame.platform.map((e) => 
              <p className= 'Gnr'>{e}</p>
              )}</p> */}
          </div>
        </div>
    </div>
    )}

export default Detalle