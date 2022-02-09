import React from "react";

function NavOption ({handleClick,title,id,classtitle}){

    return(
        <button 
            onClick={() => handleClick(id)}
            className={classtitle}
        >
            {title}    
        </button>
    );
}

export default NavOption;