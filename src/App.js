import React from 'react';
import './App.css';
import Menu from './Components/Menu';
import Logo from './Components/Logo';
import OrderList from './Components/OrderList';
import Nav from './Components/Nav';


function App() {
  return (
    <div className="App">
      <Menu />
      <div className='mainPage'>
          <Nav />
          <OrderList />
      </div>
    </div>
  );
}

export default App;
