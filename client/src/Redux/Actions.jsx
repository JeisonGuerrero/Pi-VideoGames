import axios from "axios";

export const getVideogame = () => {
    return async (dispatch) => {
        try {
            let rutaVideogames = await axios ('http://localhost:3001/videogames');
            return dispatch ({
                type: 'GET_VIDEOGAMES',
                payload: rutaVideogames.data
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
                type: 'GET_VIDEOGAMES',
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