import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import BookablesPage from "./Bookables/BookablesPage";
import BookingsPage from "./Bookings/BookingsPage";
import UsersPage from "./Users/UsersPage";
import UserPicker from "./Users/UserPicker";
import { UserProvider } from "./Users/UserContext";
import { FaCalendarAlt, FaDoorOpen, FaUsers } from "react-icons/fa";
import "../App.css";

/*
  For components to access a shared React Query cache, 
  we make the cache available by wrapping our app JSX in a provider component.
*/
const queryClient = new QueryClient();

function App() {
  return (
    /*
      Wrap the app in the provider, setting the client as a prop.
    */
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Router>
          <div className="App">
            <header>
              <nav>
                <ul>
                  <li>
                    <Link to="/bookings" className="btn btn-header">
                      <FaCalendarAlt />
                      <span>Bookings</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/bookables" className="btn btn-header">
                      <FaDoorOpen />
                      <span>Bookables</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/users" className="btn btn-header">
                      <FaUsers />
                      <span>Users</span>
                    </Link>
                  </li>
                </ul>
              </nav>
              <UserPicker />
            </header>
            <Routes>
              <Route path="/bookings" element={<BookingsPage />} />
              <Route path="/bookables/*" element={<BookablesPage />} />
              <Route path="/users" element={<UsersPage />} />
            </Routes>
          </div>
        </Router>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
