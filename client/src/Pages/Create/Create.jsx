import {React, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getGenres, getPlatforms, getVideogame, formularioDeCreacion } from '../../Redux/Actions'

function validate (input) {
  let errors = {}

  if(!input.name) {
    errors.name = 'El nombre es requerido'
  } else if(!/^[a-zA-Z0-9-() .]+$/.test(input.name)){
    errors.name = 'Solo se aceptan letras, numeros, guiones medios y parentesis'
  }

  if(input.image.length !== 0 && !/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(input.image)){
    errors.image='invalid URL'
  }

  if(!input.description) {
    errors.description = 'La descripcion es requerida'
  } else if (input.description.length > 100) {
    errors.description = 'La descripcion es muy larga. (Max = 100 caracteres)'
  }

  if(!input.released) {
    errors.released = 'La fecha de lanzamiento es requerida'
  }

  if(!input.rating) {
    errors.rating = 'El rating es requerido'
  } else if(input.rating > 5) {
    errors.rating = 'El rating no debe ser mayor a 5'
  } else if(input.rating < 0) {
    errors.rating = 'El rating no puede ser un numero negativo'
  }

  return errors //la funcion validate devuelve el objeto errors, ya sea vacio o con alguna propiedad si es q encuentra un error
}

function Create() {

  const [input, setInput] = useState({
    name: "",
    image: "",
    description: "",
    released: "",
    rating: "",
    genres: [],
    platforms: []
  });

  const [errors, setErrors] = useState({}); //me creo un estado local, en donde errors = {}
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const generos = useSelector((state) => state.genres);
  const plataformas = useSelector(state => state.platforms);
  const allNames = useSelector(state => state.videogames)

  
  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
    dispatch(getVideogame());
  }, [dispatch])
  
  function handleSubmit(e) {
    e.preventDefault();
    let noRepeat = allNames.filter(n => n.name === input.name)
    if(noRepeat.length !== 0) {
      alert('Ya existe un juego con ese nombre, por favor elija otro')
    } else {
        let error = Object.keys(validate(input)) 
        if(error.length !== 0 || !input.genres.length || !input.platforms.length) {
          alert('Llene los campos correctamente')
          return
        } else {
          formularioDeCreacion(input);
          setInput({
            name: "",
            image: "",
            description: "",
            released: "",
            rating: "",
            genres: [],
            platforms: [],
          });
          console.log(input);
          alert("Felicidades, el juego fue creado exitosamente.");
        }
        navigate('/home')

    }
  }

  function handleChange(e) {
    e.preventDefault();
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(validate({
      ...input,
      [e.target.name]: [e.target.value]
    })
    )
  }

  function handleGenres(e) {
    if(!input.genres.includes(e.target.value)) {
      setInput({
        ...input,
        genres: [...input.genres, e.target.value],
      })
    }
  }

  function handlePlatforms(e) {
    if(!input.platforms.includes(e.target.value)) {
      setInput({
        ...input,
        platforms: [...input.platforms, e.target.value]
      })
    }
  }

  function handleDeleteG(e) {
    setInput({
      ...input,
      genres: input.genres.filter((gen) => gen !== e)
    });
  }

  function handleDeleteP(e) {
    setInput({
      ...input,
      platforms: input.platforms.filter((plat) => plat !== e)
    });
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div >
          <h2 >CREA TU PROPIO VIDEOJUEGO</h2>

          <div >
            <label >Nombre: </label>
            <input
              type="text"
              required
              name="name"
              value={input.name}
              onChange={(e) => handleChange(e)}
              /> <span ></span>
            {errors.name && (
              <p >{errors.name}</p>
            )}
          </div>


          <div >
            <label >Imagen URL: </label>
            <input
              type="text"
              name="image"
              value={input.image}
              onChange={(e) => handleChange(e)}
              /> <span ></span>
            {errors.image && (
              <p >{errors.image}</p>
            )}
          </div>


          <div >
            <label >Fecha de lanzamiento: </label>
            <input
              required
              type='date'
              name="released"
              value={input.released}
              placeholder='yyyy-mm-dd'
              onChange={(e) => handleChange(e)}
              /> <span></span>
            {errors.released && (
              <p >{errors.released}</p>
            )}

          </div>

          <div >
            <label >Rating: </label>
            <input
              required
              type="number"
              name="rating"
              value={input.rating}
              onChange={(e) => handleChange(e)}
              /> <span ></span>
            {errors.rating && (
              <p >{errors.rating}</p>
            )}
          </div>

          <div >
            <label >Generos: </label>
            <select id="genres" defaultValue="" onChange={(e) => handleGenres(e)}>
              <option value='' disabled hidden>Elija los géneros...</option>
              {generos.map((g) => {
                return (
                  <option key={g.id} value={g.name}>{g.name}</option>
                  );
                })}
            </select> <span ></span>
            {input.genres.map((g) => (
              <div >
                <div >{g}</div>
                <button onClick={() => handleDeleteG(g)} key={g} value={g}><span >X</span></button>
              </div>
        ))}
          </div>

           <div >
              <label >Plataformas:  </label>
              <select id="platforms" defaultValue="" onChange={(e) => handlePlatforms(e)}>
                  <option value="" disabled hidden>Elija las plataformas...</option>
                  {plataformas?.map(p => {
                    return (
                      <option value={p.name} key={p.id}>{p.name}</option>
                      );
                    })}
              </select> <span ></span>
              {input.platforms.map((p) => (
                <div >
                  <div >{p}</div>
                  <button onClick={() => handleDeleteP(p)} key={p} value={p}><span >X</span></button>
                </div>
              ))}
          </div> 

          <div >
            <label >Descripcion: </label>
            <textarea
              required
              type="text"
              name="description"
              value={input.description}
              onChange={(e) => handleChange(e)}
              > </textarea>
            {errors.description && (
              <p >{errors.description}</p>
            )}
          </div>
      </div>
      <div>
          <button type="submit">CREAR VIDEOJUEGO</button>
      </div>
      <div >
          <Link to={'/home'} >
            <button>Cancelar</button>
            </Link>
      </div>
      </form>

    </div>
  );
}

export default Create