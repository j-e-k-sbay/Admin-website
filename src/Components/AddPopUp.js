import React, { useState } from 'react';
import Select from 'react-select'
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@date-io/date-fns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateTimePicker from '@material-ui/lab/DateTimePicker';
import '../Styles/AddPopUp.css';

function AddPopUp({trigger,setTrigger,getNewOrder}){
    const [value, setValue] = React.useState(new Date());
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [price, setPrice] = useState("");
    const [status, setStatus] = useState("");
    const [date, setDate] = useState("");
    const [time,setTime] = useState("");
    
    const getOrder = () =>{
        if(country==="" || city==="" 
            || street==="" || date==="" 
            || time==="" || price==="" 
            || status==="") return;

        getNewOrder({country: country,
            city:city,
            street: street,
            date: date,
            time: time,
            price: price,
            status: status});
        setCountry("");
        setCity("");
        setStreet("");
        setPrice("");
        setStatus("");
        setDate("");
        setTime("");
    }

    const getCountry = (event) =>{
        setCountry(event.target.value);
    }

    const getStreet = (event) =>{
        setStreet(event.target.value);
    }

    const getCity = (event) =>{
        setCity(event.target.value);
    }

    const getPrice = (event) =>{
        setPrice("$"+event.target.value);
    }

    const getStatus = (selectedOption) =>{
        setStatus(selectedOption.value);
    }

    const statusOptions=[
        {value: "Canceled", label: "Cancelled"},
        {value: "Sent", label: "Sent"},
        {value: "Registered", label: "Registered"},
        {value: "Packing", label: "Packing"}
      ]
      const customStylesFilters = {
        control: () => ({
            display: "flex",
            minWidth: "202px",
            padding: "0px",
            fontSize:"15px",
            outline: "none",
            borderRadius: "30px",
            border: "1px solid rgb(216, 216, 216);",
            cursor: "pointer",
            background: "white",
            marginTop: "0px",
            textAlign: "left",
          }),
        
          menu: (provided, state) => ({
            ...provided,
            padding: "5px",
            marginRight:"15px",
            marginTop: "0px",
            borderRadius: "30px",
            width: "205px",
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

    return (trigger) ? (
       
            <div className="addpopup-container">
                <div className='addpopup-inner'>
                    <button className='close-btn' onClick={setTrigger}>
                        <div className='text'>X</div>
                    </button>
                    <div className='add-title'>New Order</div>
                    <div className='add-container'>
                        <div className='add-box'>
                            <div className='input-title'>Country</div>
                            <input className='input-box' type="text" placeholder='country' onChange={getCountry}/>
                        </div>
                        <div className='add-box'>
                            <div className='input-title'>City</div>
                            <input className='input-box' type="text" placeholder='city' onChange={getCity}/>
                        </div>
                        <div className='add-box'>
                            <div className='input-title'>Street</div>
                            <input className='input-box' type="text" placeholder='street'onChange={getStreet}/>
                        </div>
                        <div className='add-box'>
                            <div className='input-title'>Price</div>
                            <input className='input-box' type="number" placeholder='price' onChange={getPrice}/>
                        </div>
                    </div>
                    <div className='add-container'>
                        <div className='add-box'>
                            <div className='input-title'>Status</div>
                            <Select
                                placeholder="status"
                                isSearchable={false} 
                                styles={customStylesFilters} 
                                options={statusOptions}
                                onChange={getStatus}
                            />
                        </div>

                        <div className='add-box'>
                        <div className='input-title'>Date and Time</div>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label=""
                            value={value}
                            onChange={(newValue) => {
                            setValue(newValue);
                            setTime(value.toLocaleString('en-US', { hour: 'numeric', minute:'numeric', hour12: true}));
                            setDate(value.toLocaleDateString('en-US'));
                            }}
                            />
                        </LocalizationProvider>
                        </div>
                        <div className='submit-btn-container'>
                            <button className='submit-btn'
                                onClick={getOrder}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
       
    ) : "";
}

export default AddPopUp;