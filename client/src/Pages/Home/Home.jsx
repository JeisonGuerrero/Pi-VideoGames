import React from 'react'
import Cards from '../../Components/Cards/Cards'
import './Home.css'

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogame } from '../../Redux/Actions';
import Filtros from '../../Components/Filtros/Filtros';
import Paginado from '../../Components/Paginado/Paginado';
import Loading from '../../Components/Loading/Loading';

function Home() {

  const dispatch = useDispatch();

  const [carga, setCarga] = useState(true);

  useEffect(() => {
    dispatch(getVideogame()).then(() => setCarga(false));
  }, [dispatch]);


  const allVideogames = useSelector((state) => state.videogames);

  const [paginaEnEsteMomento, setPaginaEnEsteMomento] = useState(1);
  const cantidadPorPagina = 16;
  const indiceUno = paginaEnEsteMomento * cantidadPorPagina;
  const ultimoIndice = indiceUno - cantidadPorPagina;
  const listaDeGames = allVideogames.slice(ultimoIndice, indiceUno);

  React.useEffect(() => {
    window.scrollTo(0, 0);
}, [cantidadPorPagina]);

  if (carga) {
    return <Loading/>;
  }

  return (
    <div className='DivPadreHome'>
      <div className='Header'>
        <Filtros setPaginaEnEsteMomento={setPaginaEnEsteMomento}/>
      </div>
      <div className='Body'>
        <Cards videogames={listaDeGames}/>
      </div>
      <div className='Footer'>
      <Paginado
        setPaginaEnEsteMomento={setPaginaEnEsteMomento}
       cantidadPorPagina={cantidadPorPagina}
         paginaEnEsteMomento={paginaEnEsteMomento}
      />
      </div>
    </div>
  )
}

export default Home