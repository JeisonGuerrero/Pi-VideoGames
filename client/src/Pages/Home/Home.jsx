import React from 'react'
import Cards from '../../Components/Cards/Cards'
import './Home.css'

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getVideogame } from '../../Redux/Actions';

function Home() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideogame());
    dispatch(getGenres());
  }, [dispatch]);

  const allVideogames = useSelector((state) => state.videogames);

  console.log(allVideogames, 'esto es all videogames')

  return (
    <div className='DivPadreHome'>
      <h1>Esta es la Home</h1>
      <Cards videogames={allVideogames}/>
    </div>
  )
}

export default Home