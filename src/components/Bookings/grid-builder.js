import { sessions as sessionNames } from "../../static.json";
import {addDays, shortISO} from "../../utils/date-wrangler";


// Function that accept the current bookable and week start date as arguments.
export function getGrid(bookable, startDate){
    
    // Use the day numbers and start date to create an array of dates for the week.
    const dates = bookable.days.sort().map(
        d => shortISO(addDays(startDate, d))
    );

    // Use the session names and numbers to create an array of session names.
    const sessions = bookable.sessions.map( i => sessionNames[i])

    const grid = {}

    sessions.forEach(session => {
        grid[session] = {}
        dates.forEach(date => grid[session][date] = {
            session,
            date,
            bookableId: bookable.id,
            title: ""
        });
    });

    // In addition to the grid, return the dates and sessions arrays for convenience.
    return {
        grid,
        dates,
        sessions
    };
}

export function transformBookings (bookingsArray) {
    return bookingsArray.reduce((bookings, booking) => {
        const { session, date } = booking

        if(!bookings[session]){
            bookings[session] = {}
        }
        bookings[session][date] = booking;
        return bookings;
    }, {});
}