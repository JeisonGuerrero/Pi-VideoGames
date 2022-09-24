import React from 'react';
import { Link } from 'react-router-dom';
import './Principal.css';

function Principal() {
  return (
    <div className='DivPadre'>
        <div className='ContenedorMsg'>
          <div className='Msg'>
            <h2 className='Mensaje'>Welcome to Video Games REST API!</h2>
          </div>
        </div>
        <div className='ContenedorBttn'>
          <div className='Bttn'>
            <Link to="/home">
              <h3 className='Button'> Press START! </h3>
            </Link>
          </div>
        </div>
    </div>
  )
}

export default Principal