import React, { useEffect, useState } from "react";
import PopUp from './PopUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import CountryFilter from "./CountryFilter";
import PriceFilter from "./PriceFilter";
import StatusFilter from "./StatusFilter";
import CalendarFilter from "./CalendarFilter";
import '../Styles/Filter.css';

function Filter ({orders, getFilteredOrders}) {
    const [visible, setVisible] = useState(false);
    const [isCalendar, setIsCalendar] = useState(false);
    const [currentCountry , setCurrentCountry] = useState({value: "All", label: "country"});
    const [currentPrice, setCurrentPrice] = useState({value: "All", label: "price"});
    const [currentStatus,setCurrentStatus] = useState({value: "All", label: "status"});
    const [currentStart, setCurrentStart] = React.useState(new Date("2021-02-01 00:00:00")); 
    const [currentEnd, setCurrentEnd] = React.useState(new Date());
      
    const changeVisible = () =>{
        setVisible(!visible);
    }

    const changeIsCalendar = () =>{
      setIsCalendar(!isCalendar);
    }

    const cleanFilter = () =>{
      setCurrentCountry({value: "All", label: "country"});
      setCurrentPrice({value: "All", label: "price"});
      setCurrentStatus({value: "All", label: "status"});
      setCurrentStart(new Date("2021-02-01 00:00:00"));
      setCurrentEnd(new Date());
      getFilteredOrders(orders);
      setVisible(!visible);
      setIsCalendar(false);
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

    const getDateTime = (order) =>{
        var dateTime = order.date+" "+order.time;
        var current = new Date(dateTime).getTime();
        return current;
    }

    const filterDate = (tab) =>{
      var start = currentStart;
      var end = currentEnd;
      if(currentStart.getTime()>currentEnd.getTime())
      {
        start = currentEnd;
        end = currentStart;
      }
        const filteredOrders = tab.filter(order => 
          getDateTime(order)>=start.getTime() && getDateTime(order)<=end.getTime());
        return filteredOrders;
    }

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

    const filterCountry = (tab) => {
      if(currentCountry.value === "All") return tab;
      const ordersWithCountry = tab.filter(order => order.country===currentCountry.value);
      return ordersWithCountry;
    }

    const filterOrders = () =>{
      const ordersByCountry = filterCountry(orders);
      const ordersByPrice = filterPrice(ordersByCountry);
      const ordersByStatus = filterStatus(ordersByPrice);
      const ordersByDate = filterDate(ordersByStatus);
      return ordersByDate;
    }

    const onClickSubmitFilteringOrders = () =>{
      const filteredOrders = filterOrders();
      getFilteredOrders(filteredOrders);
      changeVisible();
      setIsCalendar(false);
    }

    useEffect(()=>{
      getCountries();
    },[visible]);

    return(
        <div>
            <div>
                <PopUp trigger={visible}>
                  <div className='filter-container'>
                  <button className='filter-btn' onClick={cleanFilter}>
                        <div className='filter-btn-text'>Clean Filters</div> 
                    </button>
                    <CountryFilter
                        country = {currentCountry}
                        setCountry={(country) => {setCurrentCountry(country)}}
                        countryOptions={countryOptions}
                    />

                    <PriceFilter
                        price={currentPrice}
                        setPrice={(price) => {setCurrentPrice(price)}}
                    />

                    <StatusFilter
                        status={currentStatus}
                        setStatus={(status) => {setCurrentStatus(status)}}
                    />

                    <div className="dropdown">
                      <button className="dropbtn" onClick={changeIsCalendar}>
                        <div className='dropbtn-item'><FontAwesomeIcon icon={faCalendar}/></div>
                        <div className='dropbtn-text'>Calendar</div>
                      </button>
                      {isCalendar ? <div className="dropdown-content">
                      <CalendarFilter
                        start={currentStart}
                        setStart={(start) => {setCurrentStart(start)}}
                        end={currentEnd}
                        setEnd={(end) => {setCurrentEnd(end)}}
                      /> 
                      </div>: <></>}
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
              

        </div>
    );
}

export default Filter;