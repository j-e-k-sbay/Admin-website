import React from "react";
import Select from 'react-select'
import '../Styles/Filter.css';

function CountryFilter ({setCountry, country, countryOptions}) {

    const customStylesFilters = {
        control: () => ({
            flexDirection: "row-reverse",
            display: "flex",
            minWidth: "80px",
            padding: "3px",
            fontSize:"15px",
            outline: "none",
            borderRadius: "30px",
            border: "1px solid rgb(216, 216, 216);",
            cursor: "pointer",
            background: "white",
            marginTop: "0px",
            textAlign: "center",
          }),
        
          menu: (provided, state) => ({
            ...provided,
            padding: "5px",
            marginRight:"15px",
            marginTop: "0px",
            borderRadius: "30px",
            width: "140px",
            fontSize:"15px",
          }),
    
          option: (provided, state) => ({
            ...provided,
            borderRadius: "50px",
            backgroundColor: state.isSelected ? "rgb(194, 13, 49)" : "white",
            color: "black",
            "&:hover": {
                backgroundColor: "rgb(243, 98, 127)"
              },
          }),
      }

    const getFilterCountry =(selectedOption) => {
      setCountry(selectedOption);
    }


    return (
            <div className='select-box'>
                <Select
                    placeholder={country.label}
                    isSearchable={false} 
                    autosize={false}
                    styles={customStylesFilters} 
                    options={countryOptions}
                    onChange={getFilterCountry}
                    components={{ DropdownIndicator:() => null  ,IndicatorSeparator:() => null }}
                  />
            </div>
    );
}

export default CountryFilter;