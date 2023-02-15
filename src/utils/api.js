import {shortISO} from "./date-wrangler";

export default function getData(url){
    return fetch(url)
        .then(resp => {
            if(!resp.ok){
                throw Error("There was a problem fetching data.")
            }
            return resp.json();
        })
}

export  function getBookings(bookableId, startDate, endDate){

    // Format the dates for the querystring
    const start = shortISO(startDate); 
    const end = shortISO(endDate);

    const urlRoot = "http://localhost:3001/bookings";

    // Build up the query string.
    const query = `bookableId=${bookableId}&date_gte=${start}&date_lte=${end}`;

    // Fetch the bookings, returning a promise.
    return getData(`${urlRoot}?${query}`);
}