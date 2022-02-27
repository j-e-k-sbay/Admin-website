import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../Styles/MenuOption.css';

function MenuOption({iconName, id, name, classTitle1, classTitle2, handleClick}) {

  return (
    <div className={classTitle1}>
      <div className={classTitle2} onClick={() => handleClick(id)}>
          <FontAwesomeIcon icon={iconName}/>
      </div>
      <div className='name-option' onClick={() => handleClick(id)}>
          {name}
      </div>
         
    </div>
  );
}

export default MenuOption;
