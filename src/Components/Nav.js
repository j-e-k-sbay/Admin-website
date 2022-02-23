import React, { useState } from "react";
import NavOption from "./NavOption";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import picture from "../kurt.jpg"

function Nav ({visible,handleClick}){
    const navOptions=["Kurt Cobain","Group management","Company management"];
    const [selected,setSelected] = useState(2);
    

    const handleChange = (index) =>{
        setSelected(index);
    }

    return(
        <div className="nav-container">
            <div className={visible ? "menu-bars": "menu-bars-active"}>
                <FontAwesomeIcon icon={faBars} onClick={handleClick}/>
            </div>
            <div className="nav-options">
                {navOptions.map((item,index) =>(
                    <NavOption 
                        handleClick={handleChange}
                        key={index}
                        title = {item}
                        id = {index}
                        classtitle={selected === index ? "nav-option-selected":"nav-option"}
                    />
                ))}
            </div>
            <div className="notifications-icon">
                <FontAwesomeIcon icon={faBell}/>
            </div>
            <div className="nav-image">
                <img src={picture} alt="" width="40px" height="40px" />
            </div>
        </div>
    );
}

export default Nav;