import React, { useState } from 'react';
import Select from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBox } from '@fortawesome/free-solid-svg-icons'
import { faBuilding } from '@fortawesome/free-solid-svg-icons'
import { faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faDotCircle } from '@fortawesome/free-solid-svg-icons'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import '../App.css';
import Logo from './Logo';
import MenuOption from './MenuOption';

function Menu({handleClick}) {
    const menuOptionList = ([
        {iconName: faBox, name: "Orders"},
        {iconName: faBuilding, name: "Companies"},
        {iconName: faUserFriends, name: "Groups"},
        {iconName: faUser, name: "Users"},
        {iconName: faDotCircle, name: "Credits"},
        {iconName: faFile, name: "Documents"},
    ]);

    const customStyles = {
        indicatorsContainer: () =>({
            marginLeft: "auto",
        }),

        // valueContainer: () => ({
        //     wordWrap: "break-word"
        // }),

        control: () => ({
            display: "flex",
            padding: "5px 0px 5px 30px",
            fontSize:"15px",
            outline: "none",
            cursor: "pointer",
            background: "white",
            wordWrap: "break-word"
          }),
        
          menu: (provided, state) => ({
            ...provided,
            padding: "5px",
            marginRight:"15px",
            marginTop: "0px",
            // width: "140px",
            fontSize:"15px",
          }),
    
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "rgb(194, 13, 49)" : "white",
            color: "black",
            "&:hover": {
                backgroundColor: "rgb(243, 98, 127)"
              },
          })
      }

    const companyOptions = [
        {value: "Sbay", label: "Sbay"},
        {value: "Kurs matura informatyka", label: "Kurs matura informatyka"}
    ]

    const [selected, setSelected] = useState(0);
    const [sidebar, setSidebar] = useState(false);
    const [currentCompany, setCurrentCompany] = useState(companyOptions[0]);

    const getCurrentCompany = (selectedCompany) =>{
        setCurrentCompany(selectedCompany);
    }

    const showSidebar = () =>{
        setSidebar(!sidebar);
        console.log(sidebar);
    }

    const handleChange = (id) =>{
        setSelected(id);
    }


  return (
    <>
        <div className="menu">
            <div className='logo-container'>
                <Logo />
                <div className="exit-icon" onClick={handleClick}>
                    X
                </div>
            </div>
        <div className='select-company-container'>
            <Select
                isSearchable={false}
                styles={customStyles}
                options={companyOptions}
                onClick={getCurrentCompany}
                placeholder={currentCompany.label}
            />
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
    </>
  );
}

export default Menu;
