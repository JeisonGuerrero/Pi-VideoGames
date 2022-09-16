const initialState = {
    videogames: [],
    genres: [],
    unVideogame: {},
}

function reducer(state = initialState, { type, payload }) {
    switch (type) {
      case "GET_VIDEOGAMES":
        console.log("aca esta pedido de videogames", payload);
        return {
          ...state,
          videogames: payload,
        };
  
      case "GET_GENRES":
        console.log("aca esta pedido generos", payload);
        return {
          ...state,
          genres: payload,
        };
  
      case "VIDEOGAMES_BY_ID":
        console.log("aca esta videogames por Id", payload);
        return {
          ...state,
          unVideogame: payload,
        };
      
      default: return state

      }
  }
  
  export default reducer;