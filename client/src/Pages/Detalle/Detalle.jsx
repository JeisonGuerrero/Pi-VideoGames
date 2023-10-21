import React from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getByIdVideogames, desmontarGame } from '../../Redux/Actions';
import './Detalle.css';

function Detalle() {
    const { id } = useParams();

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
        <div className='contenedorPadreDetalle'>
          <div className='contenedorDetalle'>
            <div className='contenedorImgPadre'>
              <div className='contenedorImgHijo'>
                <img className='img' src={unGame.image} alt={unGame.name} />
              </div>
            </div>
            <div className='contenedorText'>
              <h2>{unGame.name}</h2>
              <h3 className='span'>Generos:</h3>
              <span >
                {unGame.genres?.map((e) => typeof (e) === 'object' ? <p className= 'Gnr'>{e.name} </p> : <p className= 'Gnr'>{e} </p>) } 

              </span>
              <h3 className='span'>Descripción:</h3>
              <p>{unGame.description}</p>
              <h3 className='span'>Fecha de lanzamiento:</h3>
              <p>{unGame.released}</p>
              <h3 className='span'>Rating:</h3>
              <p>{unGame.rating}</p>
              <h3 className='span'>Plataformas:</h3>
              <p>{unGame.plataforms?.map((e) => 
                <p className= 'Gnr'>{e} </p>
                )}</p>
            </div>
            <div className='contenedorBtn'>
              <Link to='/home'>
                <button className="Btn-Back"> Volver </button>
              </Link>
            </div>
          </div>
        </div>
    </div>
    )}

export default Detalle