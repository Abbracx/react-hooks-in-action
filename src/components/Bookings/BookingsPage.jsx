import { useState } from "react"
import BookablesList from "../Bookables/BookablesList"
import Bookings from "./Bookings"


const BookingsPage = () => {
  const [bookable, setBookable] = useState(null)

  return (
    <main className="bookings-page">
      <BookablesList 
        bookable={bookable}
        setBookable={setBookable}
      />
      <Bookings 
        bookable={bookable}
      />

      {/* <WeekPicker date={new Date()} /> */}
    </main>
  )
}

export default BookingsPage