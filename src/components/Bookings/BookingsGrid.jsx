import {useEffect, useMemo, useState, Fragment} from "react"
import {getGrid, transformBookings} from "./grid-builder";
import {getBookings} from "../../utils/api";
import Spinner from "../UI/Spinner";
import { useBookings, useGrid } from "./bookingsHook";



export default function BookingsGrid ({week, bookable, booking, setBooking}) {

      const { bookings, status, error } = useBookings(bookable?.id, week.start, week.end)

      const { grid, sessions, dates } = useGrid(bookable, week.start)
      // Handle the bookings data locally.
      // const [bookings, setBookings] = useState(null);
      // const [error, setError] = useState(false);


      // const { grid, sessions, dates } = useMemo(
      //       // Call the grid generator only if there’s a bookable.
      //       () => bookable ? getGrid(bookable, week.start) : {},
      //       [bookable, week.start])

      useEffect(() => {
            if(bookable){
                  // Use a variable to track whether the bookings data is current.
                  // let doUpdate = true

                  // setBookings(null)
                  // setError(null)
                  setBooking(null)

                  // getBookings(bookable.id, week.start, week.end)
                  //       .then(resp => {
                              // Check if the bookings data is current.
                              // if(doUpdate) {
                                    // Create a bookings lookup and assign it to state.
                                    // setBookings(transformBookings(resp));
                              // }
                        // })
                        // .catch(setError)
                  
                  // Return a cleanup function to invalidate the data.
                  // return () => doUpdate = false;
            }
      }, [week.start, bookable, setBooking])

      /*
            Cell helper function that returns the UI for a single cell 
            in the bookings grid. 
            It uses the two lookup objects, bookings and grid, to get the data for the cell, 
            set the cell’s class, and attach an event handler if there are bookings.
      */
      function cell (session, date){
            
            const cellData = bookings?.[session]?.[date] || grid[session][date]
            const isSelected = booking?.session === session && booking?.date === date;

            return (
                  <td 
                  key={date} 
                  className={isSelected ? "selected" : null}
                  onClick={status === "success" ? () => setBooking(cellData) : null }
                  >
                  {cellData.title}
                  </td>
            )
            
      }

      if(!grid){
            return <p>Waiting for bookable and week details...</p>
      }
    return (
      <Fragment>
            {status === "error" && (
                  <p className="bookingsError">
                        {`There was a problem loading the bookings data (${error})`}
                  </p>
            )}
            <table
                  className={status === "success" ? "bookingsGrid active" : "bookingsGrid"}
            >
                  <thead>
                  <tr> 
                        <th>
                        <span className="status">
                              <Spinner/>
                        </span>
                        </th>
                        {dates.map(d => (
                        <th key={d}>
                        {(new Date(d)).toDateString()}
                        </th> 
                        ))}
                  </tr>
                  </thead>
                  <tbody>
                        {sessions.map(session => (
                        <tr key={session}>
                        <th>{session}</th>
                        {dates.map(date => cell(session, date))} </tr>
                        ))}
                  </tbody>
            </table>
      </Fragment>
    );
    }
    