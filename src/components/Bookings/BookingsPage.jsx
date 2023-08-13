import useFetch from "../../utils/useFetch";
import {useBookingsParams} from "./bookingsHook";
import BookablesList from "../Bookables/BookablesList";
import Bookings from "./Bookings";
import { shortISO } from "../../utils/date-wrangler";
import Spinner from "../UI/Spinner";


const BookingsPage = () => {
  // const [bookable, setBookable] = useState(null)

  const { data: bookables = [], status, error } = useFetch("http://localhost:3001/bookables")
  const {date, bookableId} = useBookingsParams();

  /* 
    Return the first bookable from the bookable list
    if bookableId isn't present from the querystring.
  */
  const bookable = bookables.find(
    b => b.id === bookableId ) || bookables[0]

    // create URL for each of the bookables
    function getUrl(id) {
      const root = `/bookings?bookableId=${id}`;
      return date ? `${root}&date=${shortISO(date)}` : root
    }

    if(status === "error") {
      return <p>{error.message}</p>
    }

    if(status === "loading"){
      return <Spinner />
    }

  return (
    <main className="bookings-page">
      <BookablesList 
        bookable={bookable}
        bookables={bookables}
        getUrl={getUrl}
      />
      <Bookings 
        bookable={bookable}
      />

      {/* <WeekPicker date={new Date()} /> */}
    </main>
  )
}

export default BookingsPage