import React from 'react'
import Cards from '../../Components/Cards/Cards'
import './Home.css'

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogame } from '../../Redux/Actions';
import Ordenamientos from '../../Components/Ordenamientos/Ordenamientos';
import Paginado from '../../Components/Paginado/Paginado';

function Home() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideogame());
  }, [dispatch]);

  const allVideogames = useSelector((state) => state.videogames);

  const [paginaEnEsteMomento, setPaginaEnEsteMomento] = useState(1);
  const cantidadPorPagina = 15;
  const indiceUno = paginaEnEsteMomento * cantidadPorPagina;
  const ultimoIndice = indiceUno - cantidadPorPagina;
  const listaDeGames = allVideogames.slice(ultimoIndice, indiceUno);

  return (
    <div className='DivPadreHome'>
      <h1>Esta es la Home</h1>
      <Ordenamientos setPaginaEnEsteMomento={setPaginaEnEsteMomento}/>
      <Paginado
        setPaginaEnEsteMomento={setPaginaEnEsteMomento}
        cantidadPorPagina={cantidadPorPagina}
        paginaEnEsteMomento={paginaEnEsteMomento}
      />
      <Cards videogames={listaDeGames}/>
    </div>
  )
}

export default Home