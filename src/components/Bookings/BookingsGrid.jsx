import {useEffect, useMemo, useState, Fragment} from "react"
import {getGrid, transformBookings} from "./grid-builder";
import {getBookings} from "../../utils/api";
import Spinner from "../UI/Spinner";


export default function BookingsGrid ({week, bookable, booking, setBooking}) {
      // Handle the bookings data locally.
      const [bookings, setBookings] = useState(null);
      const [error, setError] = useState(false);


      const { grid, session, dates } = useMemo(
            // Call the grid generator only if there’s a bookable.
            () => bookable ? getGrid(bookable, week.start) : {},
            [bookable, week.start])

      useEffect(() => {
            if(bookable){
                  // Use a variable to track whether the bookings data is current.
                  let doUpdate = true

                  setBookings(null)
                  setError(null)
                  setBooking(null)

                  getBookings(bookable.id, week.start, week.end)
                        .then(resp => {
                              // Check if the bookings data is current.
                              if(doUpdate) {
                                    // Create a bookings lookup and assign it to state.
                                    setBookings(transformBookings(resp));
                              }
                        })
                        .catch(setError)
                  
                  // Return a cleanup function to invalidate the data.
                  return () => doUpdate = false;
            }
      }, [week, bookable, setBooking])


    return (
    <div className="bookings-grid placeholder">
          <h3>Bookings Grid</h3>
          <p>{bookable?.title}</p>
          <p>{week.date.toISOString()}</p>
    </div> );
    }
    