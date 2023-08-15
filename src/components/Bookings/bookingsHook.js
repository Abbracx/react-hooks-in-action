import { useMemo } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { shortISO, isDate } from "../../utils/date-wrangler";
import getData from "../../utils/api";
import { transformBookings } from "./grid-builder";
import { getGrid } from "./grid-builder";

export function useBookings(bookableId, startDate, endDate) {
  const start = shortISO(startDate);
  const end = shortISO(endDate);

  const urlRoot = "http://localhost:3001/bookings";

  const querystring = `bookableId=${bookableId}&date_gte=${start}&date_lte=${end}`;

// Specify an array as the query key.
  const query = useQuery(
    ["bookings", bookableId, start, end],
    getData(`${urlRoot}?${querystring}`)
  );

  return {
    bookings: query.data ? transformBookings(query.data) : {},
    ...query,
  };
}

export function useGrid(bookable, startDate) {
  return useMemo(
    () => (bookable ? getGrid(bookable, startDate) : {}),
    [bookable, startDate]
  );
}

export function useBookingsParams() {
  // Get the searchParams object
  const [searchParams, setSearchParams] = useSearchParams();

  // Use the searchParams object to access the date and bookableId parameter.
  const searchDate = searchParams.get("date");
  const bookableId = searchParams.get("bookableId");

  // Use today’s date if the date parameter is invalid.
  const date = isDate(searchDate) ? new Date(searchDate) : new Date();

  const idInt = parseInt(bookableId, 10);
  const hasId = !isNaN(idInt);

  /* 
        setSearchParams, updating the URL with a query string that matches the new parameters:
        Components that consume the search parameters will re-render, using the fresh values as the latest state
    */
  function setBookingsDate(date) {
    const params = {};
    if (hasId) {
      params.bookableId = bookableId;
    }
    if (isDate(date)) {
      params.date = date;
    }

    if (params.date || params.bookableId !== undefined) {
      /*
                The {replace: true} option causes the browser to replace 
                the current URL in its history with the new one. 
                This will prevent each visited date from appearing in the browser’s history
            */
      setSearchParams(params, { replace: true });
    }
  }

  return {
    date,
    bookableId: hasId ? idInt : undefined, // set bookableId to undefined if it's not an integer
    setBookingsDate,
  };
}
