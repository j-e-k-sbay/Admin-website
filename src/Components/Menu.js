import React, { useState } from 'react';
import { faBox } from '@fortawesome/free-solid-svg-icons'
import { faBuilding } from '@fortawesome/free-solid-svg-icons'
import { faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faDotCircle } from '@fortawesome/free-solid-svg-icons'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import '../App.css';
import Logo from './Logo';
import MenuOption from './MenuOption';

function Menu() {
    const menuOptionList = ([
        {iconName: faBox, name: "Orders"},
        {iconName: faBuilding, name: "Companies"},
        {iconName: faUserFriends, name: "Groups"},
        {iconName: faUser, name: "Users"},
        {iconName: faDotCircle, name: "Credits"},
        {iconName: faFile, name: "Documents"},
    ]);

    const [selected, setSelected] = useState(1);

    const handleChange = (id) =>{
        setSelected(id);
    }


  return (
    <div className='menu'>
        <Logo />
        <div className='select-company-container'>
            <select className='select-company' name="" id="">
                <option value="Sbay">Sbay</option>
                <option value="Kurs Matura Informatyka">Kurs Matura Informatyka</option>
            </select>
        </div>
        <div>
            {menuOptionList.map((item,index) =>(
                <MenuOption
                key={index}
                id={index}
                handleClick={handleChange}
                iconName = {item.iconName}
                name = {item.name}
                classTitle1 = {selected === index ? "menu-option red-selected":"menu-option"}
                classTitle2 = {selected === index ? "icon-option red-icon":"icon-option grey"}
                />
            )
            )}
        </div>
    </div>
  );
}

export default Menu;
