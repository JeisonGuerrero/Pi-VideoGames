import React from 'react';
import { Link } from 'react-router-dom';
import './Principal.css';

function Principal() {
  return (
    <div>
        <div>
            <h2 className='Mensaje'>Welcome to Video Games REST API!</h2>
            <Link to="/home">
              <span className='Button'> Go! </span>
            </Link>
        </div>
    </div>
  )
}

export default Principal