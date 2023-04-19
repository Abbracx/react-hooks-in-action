import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { shortISO, isDate } from "../../utils/date-wrangler";
import useFetch from "../../utils/useFetch";
import { transformBookings } from "./grid-builder";
import { getGrid } from "./grid-builder";


export function useBookings(bookableId, startDate, endDate){
    const start = shortISO(startDate)
    const end   = shortISO(endDate)

    const urlRoot = "http://localhost:3001/bookings";

    const querystring = `bookableId=${bookableId}&date_gte=${start}&date_lte=${end}`;
    const query = useFetch(`${urlRoot}?${querystring}`);


    return {
        bookings: query.data ? transformBookings(query.data) : {},
        ...query
    };
}

export function useGrid(bookable, startDate){
    return useMemo(
        () => bookable ? getGrid(bookable, startDate) : {},
        [bookable, startDate]
    )
}

export function useBookingsParams() {
    // Get the searchParams object
    const [searchParams] = useSearchParams();


    // Use the searchParams object to access the date and bookableId parameter.
    const searchDate = searchParams.get("date")
    const bookableId = searchParams.get("bookableId")

    // Use today’s date if the date parameter is invalid.
    const date = isDate(searchDate) ? new Date(searchDate) : new Date()

    const idInt = parseInt(bookableId, 10)
    const hasId = !isNaN(idInt)

    return {
        date,
        bookableId : hasId ? idInt : undefined // set bookableId to undefined if it's not an integer
    }
}

