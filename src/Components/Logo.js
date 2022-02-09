import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMonero } from '@fortawesome/free-brands-svg-icons'
import '../App.css';

function Logo() {
  return (
    <div className='logo'>
      <div className='logo-icon'>
        <FontAwesomeIcon icon={faMonero}/>
      </div>
      <div className='logo-text'>menuland</div>
      
    </div>
  );
}

export default Logo;
