const initialState = {
    videogames: [],
    genres: [],
    unVideogame: {},
    gameModificable: [],
    gameCreate: 'Inicial'
}

function reducer(state = initialState, { type, payload }) {
    switch (type) {
      case "GET_VIDEOGAMES":
        return {
          ...state,
          videogames: payload,
          gameModificable: payload
        };
  
      case "GET_GENRES":
        return {
          ...state,
          genres: payload,
        };
  
      case "VIDEOGAMES_BY_ID":
        return {
          ...state,
          unVideogame: payload,
        };

      case "DESMONTAR_GAME":
      return {
        ...state,
        unVideogame: {},
      };

      case "FILTRO_GENRES":
        const listaVideoGames = [...state.videogames];
        let listaGn;
        if (payload === 'todos') {
          listaGn = listaVideoGames;
        }else{
          const aux = listaVideoGames.filter( (e) => e.genres?.filter( (e) => e === payload).length)
          listaGn = aux.length ? aux : listaVideoGames;
            if(!aux.length) {
              alert("No existen juegos con este genero")
            }
        }
        return {
          ...state,
          gameModificable: listaGn
        }
        
    case "FILTRO_GAMES":
      const todosLosGames = [...state.videogames];
      let filtrados;
      if (payload === "todos") {
        filtrados = todosLosGames;
      } else {
        const auxiliar =
          payload === "guardadosEnLaDb"
            ? todosLosGames.filter(
                (game) => game.id.toString().length > 10
              )
            : todosLosGames.filter(
                (game) => game.id.toString().length < 10
              );
        filtrados = auxiliar.length ? auxiliar : todosLosGames;
        console.log("Aqui esta filtro games", auxiliar)

        if (!auxiliar.length) {
          alert("NO EXISTE NINGUN VIDEOJUEGO EN NUESTRA BASE DE DATOS");
        }
      }
      return {
        ...state,
        gameModificable: filtrados,
      };

    case "ORDEN_ALFABETICO":
      const listaGames = [...state.gameModificable];
      let ordenados;
      if (payload === "Az") {
        ordenados = listaGames.sort((elementoUno, elementoDos) => {
          if (
            elementoUno.name.toLowerCase() < elementoDos.name.toLowerCase()
          ) {
            return -1;
          } else {
            return 1;
          }
        });
      }
      if (payload === "Za") {
        ordenados = listaGames.sort((elementoUno, elementoDos) => {
          if (
            elementoUno.name.toLowerCase() < elementoDos.name.toLowerCase()
          ) {
            return 1;
          } else {
            return -1;
          }
        });
      }
      return {
        ...state,
        gameModificable: ordenados,
      };

    case "ORDEN_PUNTAJE":
      let puntaje = [...state.gameModificable];
      if (payload === "puntajeMinimo") {
        puntaje.sort((puntaje1, puntaje2) => {
          if (
            Number(puntaje1.rating) < Number(puntaje2.rating)
          ) {
            return -1;
          } else {
            return 1;
          }
        });
      }
      if (payload === "puntajeMaximo") {
        puntaje.sort((puntaje1, puntaje2) => {
          if (Number(puntaje1.rating) < Number(puntaje2)) {
            return 1;
          } else {
            return -1;
          }
        });
      }
      return {
        ...state,
        gameModificable: puntaje,
      };

    case "BUSQUEDA_POR_NOMBRE":
      console.log("ACA ESTA PAYLOAD ", payload);
      if (!payload) {
        return alert("NO SE ENCUENTRA UNA RECETA CON ESE NOMBRE");
      } else {
        console.log("ENCONTRE ALGO ", payload);
        return {
          ...state,
          gameModificable: payload,
        };
      }

    case "VIDEOGAME_CREADO":
      return {
        ...state,
        gameCreate: payload,
      };

    case "VIDEOGAME_NO_CREADO":
      return {
        ...state,
        gameCreate: payload,
      };

       default: return state;
    

  }
}

  
  export default reducer;