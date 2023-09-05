import axios from "axios";

export const getVideogame = () => {
    return async (dispatch) => {
        try {
            let rutaVideogames = await axios ('http://localhost:3001/videogames');
            return dispatch ({
              type: 'GET_VIDEOGAMES',
              payload: rutaVideogames.data,   
            });
        } catch (error) {
            console.log("ERROR EN LA LLAMADA AL BACK A LA RUTA VIDEOGAMES ", error);
        }
    }
};

export const getGenres = () => {
    return async (dispatch) => {
        try {
            let rutaGenres = await axios ('http://localhost:3001/genres');
            return dispatch ({
              type: 'GET_GENRES',
              payload: rutaGenres.data
            });
        } catch (error) {
            console.log("ERROR EN LA LLAMADA AL BACK A LA RUTA GENRES ", error);
        }
    }
};

export function getByIdVideogames(id) {
    return async (dispatch) => {
      try {
        let rutaById = await axios(`http://localhost:3001/videogames/${id}`);
        return dispatch({
          type: "VIDEOGAMES_BY_ID",
          payload: rutaById.data,
        });
      } catch (error) {
        console.log("ERROR EN LA RUTA BY ID ", error);
      }
    }; 
}

export function desmontarGame() {
    return {
      type: "DESMONTAR_GAME",
    };
}

export const filtroGames = (payload) => {
 return {
      type: "FILTRO_GAMES",
      payload,
    };
};

export const filtroGenres = (payload) => {
    return {
      type: "FILTRO_GENRES",
      payload,
    };
};

export function ordenAlfabetico(payload) {
    return {
      type: "ORDEN_ALFABETICO",
      payload,
    };
}
  
export function ordenPorPuntaje(payload) {
    return {
      type: "ORDEN_PUNTAJE",
      payload,
    };
}
  
export const busquedaPorNombre = (nombre) => {
    return async function (dispatch) {
      try {
        if (nombre) {
          let respuesta = await axios(
            `http://localhost:3001/videogames?name=${nombre}`
          );
          return dispatch({
            type: "BUSQUEDA_POR_NOMBRE",
            payload: respuesta.data,
          });
        } else {
          alert("INGRESA UN NOMBRE DE UN VIDEOGAME");
        }
      } catch (error) {
        console.log("ERROR EN LA LLAMADA POR QUERY NOMBRE ", error);
        alert("NO EXISTE EL VIDEOGAME");
      }
    };
};

export const formularioDeCreacion = async (payload) => {
    try {
      console.log("ACA ESTA PAYLOAD FORMULARIO ", JSON.stringify(payload));
      let crearGame = await axios.post(
        "http://localhost:3001/videogames",
        payload
      );
      return crearGame;
    } catch (error) {
      console.log("ERROR EN LA RUTA DE CREACION ", error);
    }
}