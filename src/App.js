import React, { useEffect, useState } from 'react';
import './App.css';
import Menu from './Components/Menu';
import OrderList from './Components/OrderList';
import Nav from './Components/Nav';
import useWindowDimensions from './useWindowDimensions';


function App() {
  const {width,height} = useWindowDimensions();
  const [visible,setVisible] = useState(width>640 ? true : false);

  const handleChangeVisible = () =>{
    setVisible(!visible);
  }

  useEffect(() =>{
    setVisible(width>640 ? true : false);
  },[height,width])


  return (
    <div className="app">
      {visible ? <Menu handleClick={handleChangeVisible}/>:<div className='transition'></div> }
      <div className='mainPage'>
          <Nav visible={visible} handleClick={handleChangeVisible}/>
          <OrderList/>
      </div>
    </div>
  );
}

export default App;
