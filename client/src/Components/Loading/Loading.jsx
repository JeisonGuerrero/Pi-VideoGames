import React from 'react'
import Load from '../../Images/Loading.gif'
import './Loading.css'

function Loading() {
  return (
    <div className='divPadre'>
      <div className='divHijo'>
        <img className='Gif' src={ Load } alt='Loading'/>
      </div>
    </div>
  )
}

export default Loading