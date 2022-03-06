import React,{useState} from "react";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@date-io/date-fns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateTimePicker from '@material-ui/lab/DateTimePicker';
import '../Styles/CalendarFilter.css';

function CalendarFilter ({start, setStart, end, setEnd}){
    const [visible, setVisible] = useState(false);
    const [first, setFirst] = React.useState(start);
    const [second, setSecond] = React.useState(end);

    const getStartDate = (selectedDate) =>{
        setStart(selectedDate);
        setFirst(selectedDate);
    }

    const getEndDate = (selectedDate) =>{
        setEnd(selectedDate);
        setSecond(selectedDate);
    }

    return(
        <div className="calendarFilter-container">
            <div className="padding">
                <div className="calendar-box">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label=""
                            value={first}
                            onChange={getStartDate}
                        />
                    </LocalizationProvider>
                </div>
            </div>
            <div className="padding">
                <div className="calendar-box">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label=""
                            value={second}
                            onChange={getEndDate}
                        />
                    </LocalizationProvider>
                </div>
            </div>
        </div>
    )
}

export default CalendarFilter;