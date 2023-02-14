import {useState, Fragment} from "react";
import BookablesList from "./BookablesList";
import BookableDetails from "./BookableDetails";

// import reducer from "./reducer";



export default function BookablesView() {

    const [bookable, setBookable] = useState();
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
        <Fragment>
            <BookablesList bookable={bookable}  setBookable={setBookable} />
            <BookableDetails bookable={bookable} />
        </Fragment>
    )

  }