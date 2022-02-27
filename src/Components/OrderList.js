import React, { useEffect, useState } from 'react';
import Select from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Order from './Order';
import Pagination from './Pagination';
import Filter from './Filter';
import AddPopUp from './AddPopUp';
import '../Styles/OrderList.css';

function OrderList() {
  const [orders,setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);

  const [currentPage, setCurrentPage] = useState(50);
  const ordersPerPage = 10;
  const indexOfLastItem = currentPage * ordersPerPage;
  const indexOfFirstItem = indexOfLastItem - ordersPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  
  const customStyles = {
    control: () => ({
        flexDirection: "row-reverse",
        display: "flex",
        minWidth: "80px",
        padding: "3px 0px 3px 0px",
        fontSize:"15px",
        outline: "none",
        borderRadius: "30px",
        border: "2px solid rgb(241, 241, 241)",
        cursor: "pointer",
        background: "white",
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
      })
  }

  const getData=()=>{
    fetch('data.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        return response.json();
      })
      .then(function(myJson) {
        setOrders(myJson);
        setFilteredOrders(myJson);
      });
      
  }

  const changeIsAddBtnClicked = () =>{
    setIsAddBtnClicked(!isAddBtnClicked);
  }

  const onClickAddBtn = () =>{
    changeIsAddBtnClicked();
  }

  const getNewOrder = (newOrder) =>{
    const tab = orders;
    tab.push(newOrder);
    setOrders(tab);
    changeIsAddBtnClicked();
  }

  const getFilteredOrders = (newFilteredOrders) => {
    setFilteredOrders(newFilteredOrders);
  }

  const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(()=>{
    getData();
  },[]);

  useEffect(()=>{
    setCurrentPage(1);
    console.log("zmiana ordersow");
  },[filteredOrders]);

  return (
    <div>
        <div className='title-options-container'>
            <div className='title'>
               
            </div>
            <div className='input-container'>
              <span className='input-icon'><FontAwesomeIcon icon={faSearch}/></span>
                <input className='search-input' type="text" placeholder='Search' />
            </div>

            <div className='select-container'>
              <Filter 
                orders = {orders}
                getFilteredOrders = {getFilteredOrders}
              />
              

              <div className='select-box'>
                <Select 
                  placeholder="Calendar"
                  isSearchable={false} 
                  styles={customStyles} 
                  components={{ DropdownIndicator:() => <div className='select-icon'><FontAwesomeIcon icon={faCalendar}/></div> ,IndicatorSeparator:() => null }}
                />
              </div>

              <div className='add-btn-container'>
                <button className='add-btn' onClick={onClickAddBtn}>
                  <div className='add-btn-icon'><FontAwesomeIcon icon={faPlus}/></div> 
                  <div className='add-btn-text'>Add</div> 
                </button>
              </div>
            </div>
        </div>
        <div className='grid-title'>
            <span>Delivery place</span>
            <span>Date and time</span>
            <span>Price</span>
            <span>Status</span>
        </div>
        <div>
        {currentItems.map((item,index) =>(
              <Order
                key={index}
                id={index}
                country={item.country}
                city={item.city}
                street={item.street}
                date={item.date}
                time={item.time}
                price={item.price}
                status={item.status}
              />
            )
            )}
        </div>
        <div className='pagination-container'>
          <div>
              {indexOfFirstItem+1}-{indexOfLastItem} / {filteredOrders.length}
          </div>
          <div className='pagination-buttons'>
              <Pagination ordersPerPage={ordersPerPage} totalOrders={filteredOrders.length} paginate={paginate} currentPage={currentPage}/>
          </div>
        </div>
        <AddPopUp trigger={isAddBtnClicked} setTrigger={changeIsAddBtnClicked} getNewOrder={getNewOrder}/>
    </div>
  );
}

export default OrderList;
