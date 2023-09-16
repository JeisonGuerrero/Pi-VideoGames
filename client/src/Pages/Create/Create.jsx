import React from 'react';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getGenres,
  getVideogame,
  formularioDeCreacion,
} from "../../Redux/Actions";
import { Link, useNavigate } from "react-router-dom";

function Create() {
    const dispatch = useDispatch();
    const games = useSelector((state) => state.videogames);
    const [validador, setValidador] = useState({});
    const [creacion, setCreacion] = useState("inicial");
    
  useEffect(() => {
    dispatch(getVideogame());
    dispatch(getGenres());
  }, [dispatch]);

  const navegacionAutomatica = useNavigate();
  useEffect(() => {
    if (creacion === "creada") {
      alert("SE CREO LA NUEVA RECETA");
      setTimeout(() => {
        navegacionAutomatica("/home");
      });
    }
    if (creacion === "noCreada") {
      alert("NO SE CREO LA RECETA");
    }
  }, [creacion, navegacionAutomatica]);

  const [nuevoGame, setNuevoGame] = useState({
    nombre: "",
    descripcion: "",
    rating: 0,
    imagen: "",
    generos: [],
    plataformas: [],
  });

  const manipuladorInput = (e) => {
    setNuevoGame({
      ...nuevoGame,
      [e.target.name]: e.target.value,
    });
    setValidador(
      validacion({
        ...nuevoGame,
        [e.target.name]: e.target.value,
      })
    );
  };

  const manipuladorGame = (e) => {
    const selec = nuevoGame.generos.filter(
      (elemento) => elemento !== e.target.innerHTML
    );
    console.log("ACA ESTA SETNUEVOGAME ", selec);
    if (selec.includes(e.target.value)) {
      alert("YA HA ELEGIDO ESTA DIETA");
    } else {
      setNuevoGame({
        ...nuevoGame,
        generos: [...nuevoGame.generos, e.target.value],
      });
      setValidador(
        validacion({
          ...nuevoGame,
          generos: [...nuevoGame.generos, e.target.value],
        })
      );
    }
    console.log("aca esta Nuevo Game ", nuevoGame.genre);
  };

  const eliminarGeneros = (e) => {
    const seleccion = nuevoGame.generos.filter(
      (elemento) => elemento !== e.target.innerHTML
    );

    setNuevoGame({
      ...nuevoGame,
      generos: seleccion,
    });

    setValidador(
      validacion({
        ...nuevoGame,
        generos: [...seleccion],
      })
    );
  };

  const manipuladorDeCreacion = (e) => {
    e.preventDefault();
    if (Object.keys(validador).length) {
      alert("TODOS LOS CAMPOS DEBEN ESTAR COMPLETOS");
    } else {
      if (Object.keys(validacion(nuevoGame)).length) {
        alert("LOS CAMPOS NO PUEDEN ESTAR VACIOS");
      } else {
        formularioDeCreacion(nuevoGame)
          .then(() => {
            setCreacion("creada");
          })
          .catch(() => {
            setCreacion("noCreada");
          });
      }
    }
  };

  const validacion = (nuevoGame) => {
    let validar = {};
    let noContieneNumero = /[1-9]/;
    let sinEspacios = /[\s]/;

    if (nuevoGame.nombre.length > 50)
      validar.nombre = "NO PUEDE TENER MAS DE 50 CARACTERES";
    if (nuevoGame.nombre.length < 5)
      validar.nombre = "NECESITA TENER UN MINIMO DE 5 CARACTERES";
    if (sinEspacios.test(nuevoGame.nombre[0]))
      validar.nombre = "NO PUEDE CONTENER ESPACIOS";
    if (noContieneNumero.test(nuevoGame.nombre))
      validar.nombre = "NO PUEDE CONTENER NUMEROS";
    if (
      games.find(
        (elemento) =>
          elemento.name.toUpperCase() === nuevoGame.name.toUpperCase()
      )
    ) {
      const gameExistente = games.find(
        (elemento) =>
          elemento.name.toUpperCase() === nuevoGame.name.toUpperCase()
      );
      validar.nombre = (
        <Link to={`/detalle/${gameExistente.id}`}>
          YA TENEMOS ESTA RECETA EN NUESTRA BASE DE DATOS{" "}
          {gameExistente.name}
        </Link>
      );
    }

    if (nuevoGame.descripcion.length > 100)
      validar.descripcion = "NO PUEDE TENER MAS DE 100 CARACTERES";
    if (nuevoGame.descripcion.length < 30)
      validar.descripcion = "NECESITA TENER UN MINIMO DE 30 CARACTERES";
    if (sinEspacios.test(nuevoGame.descripcion[0]))
      validar.descripcion = "NO PUEDE SER ESPACIOS EN BLANCO";

    if (nuevoGame.pasoApaso.length > 200)
      validar.pasoApaso = "NO PUEDE TENER MAS DE 100 CARACTERES";
    if (nuevoGame.pasoApaso.length < 20)
      validar.pasoApaso = "NECESITA TENER UN MINIMO DE 30 CARACTERES";
    if (sinEspacios.test(nuevoGame.pasoApaso[0]))
      validar.pasoApaso = "NO PUEDE SER ESPACIOS EN BLANCO";

    if (Number(nuevoGame.rating) < 1)
      validar.rating = "TIENE QUE SER UN PUNTAJE MAYOR A 1 ";
    if (Number(nuevoGame.rating) > 100)
      validar.rating = "NO PUEDE SER MAYOR A 100";

    if (!nuevoGame.imagen) {
      validar.imagen = "IMAGEN ES REQUERIDA";
    } else if (
      !/(?:(?:https?:\/\/))[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b(?:[-a-zA-Z0-9@:%_\+.~#?&\/=]*(\.jpg|\.png|\.jpeg|\.webp))/.test(
        nuevoGame.imagen
      )
    ) {
      validar.imagen = "INGRESE UNA URL VALIDA";
    }

    if (nuevoGame.generos.length === 0)
      validar.generos = "DEBE CONTENER AL MENOS UN GENERO";

    return validar;
  };

  return (
    <div>Create</div>
  )
}

export default Create