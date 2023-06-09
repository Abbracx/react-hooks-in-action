import { useState, useEffect, useReducer } from "react";
import { getWeek, shortISO } from "../../utils/date-wrangler";
import { useBookingsParams, useBookings} from "./bookingsHook";

import WeekPicker from "./WeekPicker";
import BookingsGrid from "./BookingsGrid";
import BookingDetails from "./BookingDetails";

import weekReducer from "./weekReducer";

export default function Bookings({bookable}){
    // const [week, dispatch] = useReducer(weekReducer, new Date(), getWeek)
    const [booking, setBooking] = useState(null)

    // Use the date to generate a week object and create a date string to use as a dependency.
    const {date} = useBookingsParams()
    const week = getWeek(date)
    const weekStart = shortISO(week.start)


    // Get bookings for the specified week
    const {bookings} = useBookings(bookable?.id, week.start, week.end)
    const selectedBooking = bookings?.[booking?.session]?.[booking.date]

    useEffect(() => {
        // Set the currently selected booking to null if the start date changes.
        setBooking(null)
    }, [bookable, weekStart]);

    return (
        <div className="bookings">
            <div>
                <WeekPicker />
                <BookingsGrid 
                    week={week}
                    bookable={bookable}
                    booking={booking}
                    setBooking={setBooking}
                />
            </div>
            <BookingDetails 
                booking={ selectedBooking || booking }
                bookable={bookable}
            />
        </div>
    )


}
