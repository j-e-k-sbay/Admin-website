import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { faDotCircle } from '@fortawesome/free-solid-svg-icons'
import '../Styles/Order.css';

function Order({country,city,street,date,time,price,status}) {
  return (
    <div className='grid'>
        <span>
            <div className='loc-icon'>
                <FontAwesomeIcon icon={faMapMarkerAlt}/> 
            </div>
            <div className='grid-text'>
                {street}, {city}, {country}
            </div>
        </span>
        <span>
            <div className='grid-text'>
                {date} | {time}
            </div>
        </span>
        <span>
            <div className='grid-text'>
                {price}
            </div>
        </span>
        <span className={status==="Canceled" ? "red" :status==="Sent" ? "green": status==="Registered" ? "blue": "yellow"}>
            <div className='dot-icon'>
                <FontAwesomeIcon icon={faDotCircle}/> 
            </div>
            <div className='grid-text'>
                {status}
            </div>
        </span>
    </div>
  );
}

export default Order;
