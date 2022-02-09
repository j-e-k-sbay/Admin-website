import React, { useEffect, useState } from 'react';
import Select from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Order from './Order';
import Pagination from './Pagination';
import '../App.css';

function OrderList() {
  const [orders,setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

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
      }),
    
      menu: (provided, state) => ({
        ...provided,
        padding: "5px",
        marginRight:"15px",
        marginTop: "0px",
        borderRadius: "30px",
        width: "110px",
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

  const options=[
    {value: "All", label: "All"},
    {value: "Canceled", label: "Cancelled"},
    {value: "Sent", label: "Sent"},
    {value: "Registered", label: "Registered"},
    {value: "Packing", label: "Packing"}
  ]
  const [currentStatus,setCurrentStatus] = useState(options[0]);

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

  const getFilterValue =(selectedOption) => {
    setCurrentStatus(selectedOption);
    console.log(currentStatus);
  }

  const filterHandler = () => {
    switch(currentStatus.value){
      case "Canceled":
        return setFilteredOrders(orders.filter(order => order.status==="Canceled"));
      case "Sent":
        return setFilteredOrders(orders.filter(order => order.status==="Sent"));
      case "Registered":
        return setFilteredOrders(orders.filter(order => order.status==="Registered"));
      case "Packing":
        return setFilteredOrders(orders.filter(order => order.status==="Packing"));
      default:
        return setFilteredOrders(orders);
    }
  }

  useEffect(()=>{
    getData();
  },[])

  useEffect(()=>{
    filterHandler();
    setCurrentPage(1);
  },[currentStatus]);

  

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  const indexOfLastItem = currentPage * ordersPerPage;
  const indexOfFirstItem = indexOfLastItem - ordersPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
        <div className='title-options-container'>
            <div className='title'>
               Orders
            </div>
            <div className='input-container'>
              <span className='input-icon'><FontAwesomeIcon icon={faSearch}/></span>
                <input type="text" placeholder='Search' />
            </div>

            <div className='select-container'>
              <div className='select-box'>
                <Select 
                  placeholder="Filter"
                  options={options} 
                  isSearchable={false} 
                  styles={customStyles} 
                  onChange={getFilterValue}
                  components={{ DropdownIndicator:() => <div className='select-icon'><FontAwesomeIcon icon={faFilter}/></div> ,IndicatorSeparator:() => null }}
                />
              </div>

              <div className='select-box'>
                <Select 
                  placeholder="Calendar"
                  isSearchable={false} 
                  styles={customStyles} 
                  components={{ DropdownIndicator:() => <div className='select-icon'><FontAwesomeIcon icon={faCalendar}/></div> ,IndicatorSeparator:() => null }}
                />
              </div>

              <div className='add-btn-container'>
                <button className='add-btn'>
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
    </div>
  );
}

export default OrderList;
