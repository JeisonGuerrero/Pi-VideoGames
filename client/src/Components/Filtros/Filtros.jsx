import React from 'react';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {filtroGames, 
        filtroGenres, 
        ordenAlfabetico, 
        ordenPorPuntaje,
        busquedaPorNombre,
        getGenres, 
        } from '../../Redux/Actions'
import './Filtros.css'

function Filtros({ setPaginaEnEsteMomento }) {

    const dispatch = useDispatch();
    const genres =   useSelector((state) => state.genres);
  
    useEffect(() => {
      dispatch(getGenres());
    }, [dispatch]);
  
    //ARRANCO CON LAS FUNCIONES QUE MANIPULAN MIS EVENTOS
  
    //FILTRO POR VIDEOGAMES:
    const filterGame = (e) => {
      let valor = e.target.value;
      dispatch(filtroGames(valor));
      setPaginaEnEsteMomento(1);
    };
  
    //FILTRO POR GENRE:
    const filterGenre = (e) => {
      let valor = e.target.value;
      dispatch(filtroGenres(valor));
      setPaginaEnEsteMomento(1);
    };
  
    //ORDEN ALFABETICO:
    const cambiarOrdenAlfa = (e) => {
      let valor = e.target.value;
      dispatch(ordenAlfabetico(valor));
    };
  
    //ORDEN POR PUNTAJE:
    const cambiarPuntaje = (e) => {
      let valor = e.target.value;
      dispatch(ordenPorPuntaje(valor));
    };
  
    //BUSCADOR POR NOMBRE:
    const [busquedaNombre, setBusquedaNombre] = useState("");
  
    const buscadorPorNombre = (e) => {
      let busqueda = e.target.value;
      setBusquedaNombre(busqueda);
    };
    const onSubmitPorNombre = (e) => {
      e.preventDefault();
      dispatch(busquedaPorNombre(busquedaNombre));
      setBusquedaNombre("");
      setPaginaEnEsteMomento(1);
    };

  return (
    <div className='contenedor'>
    <select
      className='filtro'
      onChange={(e) => filterGenre(e)}
      name="Generos"
    >
      <option value='todos'>TODOS LOS GENEROS</option>
      {genres && genres.map((e, index) => {
          return (
            <option key={index} value={e.name}>
              {e.name}
            </option>
          );
        })}
    </select>

    <select
      className='filtro'
      onChange={(e) => filterGame(e)}
      name="Videogame"
    >
      <option value="todos">TODOS LOS VIDEOJUEGOS</option>
      <option value="guardadosEnLaDb">
        Filtrar por Origen Base de Datos
      </option>
      <option value="ExistenteEnApi">Filtrar por Origen Api</option>
    </select>

    <select
      className='filtro'
      onChange={(e) => cambiarOrdenAlfa(e)}
      name="OrdenAlfabetico"
    >
      <option value="Az">Orden de la "A" a la "Z"</option>
      <option value="Za">Orden de la "Z" a la "A"</option>
    </select>

    <select
      className='filtro'
      onChange={(e) => cambiarPuntaje(e)}
      name="OrdenPuntaje"
    >
      <option value="puntajeMinimo">Orden por Puntaje Minimo</option>
      <option value="puntajeMaximo">Orden por Puntaje Maximo</option>
    </select>

    <form onSubmit={(e) => onSubmitPorNombre(e)}>
      <input
        className='buscador'
        type="text"
        value={busquedaNombre}
        onChange={(e) => buscadorPorNombre(e)}
        placeholder="Busca por nombre de videogame"
      />
      <input className='buscador' type="submit" value="Buscar" />
    </form>
  </div>
  )
}

export default Filtros