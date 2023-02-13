import { useRef, useState } from "react";

import {
    FaChevronLeft, 
    FaCalendarDay, 
    FaChevronRight, 
    FaCalendarCheck 
} from "react-icons/fa";


export default function WeekPicker({dispatch}) {

    // Generate the initial state, passing date to getWeek.
    // const [week, dispatch] = useReducer(reducer, date, getWeek) 
    const [dateText, setDateText] = useState(new Date())
    // const textboxRef = useRef();

    /* 
        1. Define a handler for the Go button
        2. Dispatch the SET_DATE action.
        3. Use the ref to get the text value in the text box.
    */

    function gotoDate() {
        dispatch({
            type: "SET_DATE",
            payload: dateText
            // payload: textboxRef.current.value
        })
    }

    return (
        <div>
            <p className="date-picker">
                <button 
                    className="btn"
                    onClick={() => dispatch({ type: "PREVIOUS_WEEK"})}
                >
                    <FaChevronLeft/>
                    <span>Prev</span>
                </button>

                <button 
                    className="btn"
                    onClick={() => dispatch({ type: "TODAY"})}
                >
                    <FaCalendarDay/>
                    <span>Today</span>
                </button>

                <span>
                    <input 
                        type="text"
                        // ref={textboxRef}
                        placeholder="e.g. 2020-09-02"
                        // defaultValue={new Date()}
                        value={dateText}
                        onChange={(e) => setDateText(e.target.value)}
                    />

                    <button
                        className="go btn"
                        onClick={gotoDate}
                    >
                        <FaCalendarCheck/>
                        <span>Go</span>
                    </button>
                </span>

                <button 
                    className="btn"
                    onClick={() => dispatch({ type: "NEXT_WEEK"})}
                >
                    <FaChevronRight/>
                    <span>Next</span>
                </button>
            </p>
        </div>
    )
}

