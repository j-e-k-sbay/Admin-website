import React, { useEffect, useState } from 'react';
import Select from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Order from './Order';
import Pagination from './Pagination';
import PopUp from './PopUp';
import '../App.css';

function OrderList({onClickAddBtn,newOrder}) {
  const [orders,setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [visible, setVisible] = useState(false);

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

  const statusOptions=[
    {value: "All", label: "status"},
    {value: "Canceled", label: "Cancelled"},
    {value: "Sent", label: "Sent"},
    {value: "Registered", label: "Registered"},
    {value: "Packing", label: "Packing"}
  ]

  const priceOptions = [
    {value: "All", label: "price"},
    {value: "100-200", label: "100-200"},
    {value: "200-300", label: "200-300"},
    {value: "300-400", label: "300-400"},
    {value: "400-500", label: "400-500"},
    {value: "500+", label: "500+"},
  ]

  const [countryOptions,setCountryOptions] = useState([]);

  const getCountries =() =>{
    const tab = [];
    const tab2 = [{value: "All", label: "country"}];
    orders.map((item) =>{
      if(!tab.includes(item.country))
      {
        tab.push(item.country)
        tab2.push({value: item.country, label: item.country})
      }
     
    })
    setCountryOptions(tab2);
  }
  
  const getFilterCountry =(selectedOption) => {
    setCurrentCountry(selectedOption);
  }

  const getFilterPrice =(selectedOption) => {
    setCurrentPrice(selectedOption);
  }

  const getFilterStatus =(selectedOption) => {
    setCurrentStatus(selectedOption);
  }

  const [currentCountry, setCurrentCountry] = useState({value: "All", label: "country"});
  const [currentPrice, setCurrentPrice] = useState({value: "All", label: "price"});
  const [currentStatus,setCurrentStatus] = useState({value: "All", label: "status"},);


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

  const filterCountry = (tab) => {
      if(currentCountry.value === "All") return tab;
      const ordersWithCountry = tab.filter(order => order.country===currentCountry.value);
      return ordersWithCountry;
      
  }

  const filterPrice = (tab) => {
    switch(currentPrice.value){
      case "100-200":
        return tab.filter(order => (order.price.slice(1)>=100 && order.price.slice(1)<200));
        case "200-300":
        return tab.filter(order => (order.price.slice(1)>=200 && order.price.slice(1)<300));
        case "300-400":
        return tab.filter(order => (order.price.slice(1)>=300 && order.price.slice(1)<400));
        case "400-500":
        return tab.filter(order => (order.price.slice(1)>=400 && order.price.slice(1)<500));
        case "500+":
        return tab.filter(order => (order.price.slice(1)>=500));
      default:
        return tab;
    }
  }

  const filterStatus = (tab) => {
    switch(currentStatus.value){
      case "Canceled":
        return tab.filter(order => order.status==="Canceled");
      case "Sent":
        return tab.filter(order => order.status==="Sent");
      case "Registered":
        return tab.filter(order => order.status==="Registered");
      case "Packing":
        return tab.filter(order => order.status==="Packing");
      default:
        return tab;
    }
  }

  const onClickSubmitFilteringOrders = () =>{
    const filteredOrdersByCountry = filterCountry(orders);
    const filteredOrdersByPrice = filterPrice(filteredOrdersByCountry);
    const filteredOrdersByStatus = filterStatus(filteredOrdersByPrice);
    setFilteredOrders(filteredOrdersByStatus);
    setVisible(!visible);
  }

  const filterOrders = () =>{
    const filteredOrdersByCountry = filterCountry(orders);
    const filteredOrdersByPrice = filterPrice(filteredOrdersByCountry);
    const filteredOrdersByStatus = filterStatus(filteredOrdersByPrice);
    setFilteredOrders(filteredOrdersByStatus);
    console.log(filteredOrders);
  }

  const changeVisible = () =>{
    setVisible(!visible);
  }

  const handleAddingOrder = () =>{
    if(!newOrder) return;
    const array = orders;
    array.push(newOrder);

    setOrders(array);
    filterOrders();
}
 
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  const indexOfLastItem = currentPage * ordersPerPage;
  const indexOfFirstItem = indexOfLastItem - ordersPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(()=>{
    getData();
  },[]);

  
  useEffect(()=>{
    handleAddingOrder();
  },[newOrder]);

  useEffect(()=>{
  },[currentCountry]);

  useEffect(()=>{
    getCountries();
  },[orders]);

  useEffect(()=>{
    setCurrentPage(1);
  },[filteredOrders]);


  return (
    <div>
        <div className='title-options-container'>
            <div className='title'>
               Orders
            </div>
            <div className='input-container'>
              <span className='input-icon'><FontAwesomeIcon icon={faSearch}/></span>
                <input className='search-input' type="text" placeholder='Search' />
            </div>

            <div className='select-container'>
              <div>
                <PopUp trigger={visible}>
                  <div className='filter-container'>
                    <div className='select-box'>
                      <Select
                        placeholder={currentCountry.label}
                        isSearchable={false} 
                        autosize={false}
                        styles={customStylesFilters} 
                        options={countryOptions}
                        onChange={getFilterCountry}
                        components={{ DropdownIndicator:() => null  ,IndicatorSeparator:() => null }}
                      />
                    </div>
                    <div className='select-box'>
                      <Select
                        placeholder={currentPrice.label}
                        isSearchable={false} 
                        styles={customStylesFilters} 
                        options={priceOptions}
                        onChange={getFilterPrice}
                        components={{ DropdownIndicator:() => null  ,IndicatorSeparator:() => null }}
                      />
                    </div>
                    <div className='select-box'>
                      <Select
                        placeholder={currentStatus.label}
                        isSearchable={false} 
                        styles={customStylesFilters} 
                        options={statusOptions}
                        onChange={getFilterStatus}
                        components={{ DropdownIndicator:() => null  ,IndicatorSeparator:() => null }}
                      />
                    </div>
                    <button className='filter-btn' onClick={onClickSubmitFilteringOrders}>
                    <div className='filter-btn-text'>Submit</div> 
                    </button>
                  </div>
                </PopUp>
              </div>
              {visible ? <></>:
              <div className='select-box'>
              <button className='filter-btn' onClick={changeVisible}>
              <div className='filter-btn-item'><FontAwesomeIcon icon={faFilter}/></div>
              <div className='filter-btn-text'>Filter</div>
              </button>
              </div>
              }
              

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
    </div>
  );
}

export default OrderList;
