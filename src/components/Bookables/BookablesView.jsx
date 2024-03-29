import {useState, Fragment} from "react";
import {Link, useParams} from "react-router-dom";
import {FaPlus} from "react-icons/fa";

import useFetch from "../../utils/useFetch";

// import reducer from "./reducer";
import BookablesList from "./BookablesList";
import BookableDetails from "./BookableDetails";
import Spinner from "../UI/Spinner";

export default function BookablesView() {

    const { data: bookables = [], status, error } = useFetch("http://localhost:3001/bookables")

    const { id } = useParams();
    const bookable = bookables.find(
        b => b.id === parseInt(id, 10)
    ) || bookables[0];


    if(status === "error") {
        return <p>{error.message}</p>
    }

    if (status === "loading") {
        return <Spinner />
      }
      
    // const [bookable, setBookable] = useState();
    // const initialState = {
    //     group: "Rooms",
    //     bookableIndex: 0,
    //     bookables: [],
    //     isLoading: true,
    //     error: false
    // };

    // const [state, dispatch] = useReducer(reducer, initialState);
    // console.log(initialState)
    // const bookablesInGroup = state.bookables.filter(
    //     b => b.group === state.group
    // )
    // const bookable = bookablesInGroup[state.bookableIndex];

    return (
        <main className="bookables-page">
            <div>
                <BookablesList 
                    bookable={bookable}  
                    bookables={bookables} 
                    getUrl={id => `/bookables/${id}`} // Provide a function to generate URLs for bookables.
                />
                <p className="controls">
                    <Link
                        to="/bookables/new"
                        replace={true}
                        className="btn">
                        <FaPlus />
                        <span>New</span>
                    </Link>
                </p>
            </div>
            
            <BookableDetails bookable={bookable} />
        </main>
    )

  }