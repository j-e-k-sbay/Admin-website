import React, { useEffect, useState } from 'react';
import './App.css';
import Menu from './Components/Menu';
import OrderList from './Components/OrderList';
import Nav from './Components/Nav';
import useWindowDimensions from './useWindowDimensions';
import AddPopUp from './Components/AddPopUp';

function App() {
  const {width,height} = useWindowDimensions();
  const [visible,setVisible] = useState(width>640 ? true : false);
  const [isAddBtnClicked,setIsAddBtnClicked] = useState(false);
  const [newOrder,setNewOrder] = useState();

  const getNewOrder = (order) =>{
    setNewOrder(order);
    changeIsAddBtnClicked();
  }

  const handleChangeVisible = () =>{
    setVisible(!visible);
  }

  useEffect(() =>{
    setVisible(width>640 ? true : false);
  },[height,width])

  const changeIsAddBtnClicked = () =>{
    setIsAddBtnClicked(!isAddBtnClicked);
  }

  return (
    <div className="app">
      {visible ? <Menu handleClick={handleChangeVisible}/>:<div className='transition'></div> }
      <div className='mainPage'>
          <Nav visible={visible} handleClick={handleChangeVisible}/>
          <OrderList
            onClickAddBtn = {changeIsAddBtnClicked}
            newOrder = {newOrder}
          />
      </div>

      <AddPopUp trigger={isAddBtnClicked} setTrigger={changeIsAddBtnClicked} getNewOrder={getNewOrder}>
    
      </AddPopUp>

    </div>
  );
}

export default App;
