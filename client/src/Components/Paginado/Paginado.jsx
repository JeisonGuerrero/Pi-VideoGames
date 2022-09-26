import React from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogame } from "../../Redux/Actions";
import './Paginado.css';

function Paginado({ setPaginaEnEsteMomento, cantidadPorPagina, paginaEnEsteMomento }) {
    const games = useSelector((state) => state.gameModificable);
 
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getVideogame);
    }, [dispatch]);
  
   
    const volverAlaAnterior = () => {
      if (paginaEnEsteMomento === 1) return;
      setPaginaEnEsteMomento(paginaEnEsteMomento - 1);
    };
  
    const irAlaSiguiente = () => {
      if (paginaEnEsteMomento >= Math.ceil(games.length / cantidadPorPagina))
        return;
      setPaginaEnEsteMomento(paginaEnEsteMomento + 1);
    };
  
    const paginas = (numPag) => {
      setPaginaEnEsteMomento(numPag);
    };
  
    let numeroDePaginas = [];
    for (let i = 1; i <= Math.ceil(games.length / cantidadPorPagina); i++) {
      numeroDePaginas.push(i);
    }

    return (
        <div className='contenedorPaginado' >
        <button className='boton' onClick={volverAlaAnterior}>Pagina anterior</button>
        {numeroDePaginas &&
          numeroDePaginas.map((numero, index) => {
            return numero !== paginaEnEsteMomento ? (
              <button className='pag' key={index} onClick={() => paginas(numero)}>
                {numero}
              </button>
            ): (
              <button
                      className='pagCurrent'
                      key={index}
                      onClick={() => paginas(numero)}
                    >
                      {numero}
                    </button>
            );
          })}
        <button className='boton' onClick={irAlaSiguiente}>Pagina siguiente</button>
      </div>
  )
}

export default Paginado