import { useRef, useState } from "react";

import {
    FaChevronLeft, 
    FaCalendarDay, 
    FaChevronRight, 
    FaCalendarCheck 
} from "react-icons/fa";
import { useBookingsParams } from "./bookingsHook";
import { addDays, shortISO } from "../../utils/date-wrangler";


export default function WeekPicker({dispatch}) {

    // Generate the initial state, passing date to getWeek.
    // const [week, dispatch] = useReducer(reducer, date, getWeek) 
    // const [dateText, setDateText] = useState(new Date())
    const textboxRef = useRef();
    const {date, setBookingsDate : goToDate} = useBookingsParams()

    /* 
        1. Define a handler for the Go button
        2. Dispatch the SET_DATE action.
        3. Use the ref to get the text value in the text box.
    */
   // function gotoDate() {
   //     dispatch({
   //         type: "SET_DATE",
   //         payload: dateText
   //         payload: textboxRef.current.value
   //     })
   // }

    const dates = {
        prev: shortISO(addDays(date, -7)),
        next: shortISO(addDays(date, 7)),
        today: shortISO(new Date())
    }


    return (
        <div>
            <p className="date-picker">
                <button 
                    className="btn"
                    onClick={() => goToDate(dates.prev)}
                >
                    <FaChevronLeft/>
                    <span>Prev</span>
                </button>

                <button 
                    className="btn"
                    onClick={() => goToDate(dates.today)}
                >
                    <FaCalendarDay/>
                    <span>Today</span>
                </button>

                <span>
                    <input 
                        type="text"
                        ref={textboxRef}
                        placeholder="e.g. 2020-09-02"
                        defaultValue={new Date()}
                        id="wpDate"
                    />

                    <button
                        className="go btn"
                        //onClick={goToDate(textboxRef.current.value)}
                    >
                        <FaCalendarCheck/>
                        <span>Go</span>
                    </button>
                </span>

                <button 
                    className="btn"
                    onClick={() => goToDate(dates.next)}
                >
                    <FaChevronRight/>
                    <span>Next</span>
                </button>
            </p>
        </div>
    )
}

