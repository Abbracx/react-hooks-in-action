import { Routes, Route } from "react-router-dom";
import BookablesView from "./BookablesView";
import BookablesEdit from "./BookablesView";
import BookablesNew from "./BookablesView";

const BookablesPage = () => {
  return (
    // <main className="bookables-page">
    //     <BookablesView />
    // </main>
    <Routes>
      <Route path="/" element={<BookablesView />}></Route>
      <Route path="/:id" element={<BookablesView />}></Route>
      <Route path="/:id/edit" element={<BookablesEdit />}></Route>
      <Route path="/new" element={<BookablesNew />}></Route>
    </Routes>
  );
};

export default BookablesPage;
