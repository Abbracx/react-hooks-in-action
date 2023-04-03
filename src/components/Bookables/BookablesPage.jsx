import { Routes, Route } from "react-router-dom"
import BookablesView from "./BookablesView"
import BookablesEdit from "./BookablesView"
import BookablesNew from "./BookablesView"


const BookablesPage = () => {
  return (
    // <main className="bookables-page">
    //     <BookablesView />
    // </main>
    <Routes>
      <Route path="/">
        <BookablesView />
      </Route>
      <Route path="/:id">
        <BookablesView />
      </Route>
      <Route path="/:id/edit">
        <BookablesEdit />
      </Route>
      <Route path="/new">
        <BookablesNew />
      </Route>
    </Routes>
  )
}

export default BookablesPage