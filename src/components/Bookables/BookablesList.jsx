import { useState, useEffect, useRef } from "react";
import {FaArrowRight} from "react-icons/fa";
import getData from "../../utils/api";
import Spinner from "../UI/Spinner";


const BookablesList = ({ bookable, setBookable }) => {
    const [bookables, setBookables] = useState([]);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const group = bookable?.group;
    // const {group, bookableIndex, bookables, isLoading, error} = state;
    const bookablesInGroup = bookables.filter(b => b.group === group); // bookables belonging to a group
    const groups = [...new Set(bookables.map(b => b.group))]; // unique bookables

    const timerRef =  useRef(null)
    const nextButtonRef = useRef()

    useEffect(() => {
        // dispatch({type: "FETCH_BOOKABLES_REQUEST"});

        getData("http://localhost:3001/bookables")
            .then(bookables => {
                setBookable(bookables[0]);
                setBookables(bookables);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error);
                setIsLoading(false);
            })
            // .then(bookables => dispatch({
            //     type: "FETCH_BOOKABLES_SUCCESS",
            //     payload: bookables
            // }))
            // .catch(error => dispatch({
            //     type: "FETCH_BOOKABLES_ERROR",
            //     payload: error
            // }));
    }, [setBookable])


    // Run an effect when the component first mounts.
    useEffect(() => {
        // Start an interval timer and assign its ID to the ref’s current property.
        // timerRef.current = setInterval(() => {
        //     dispatch({ type: "NEXT_BOOKABLE" })
            
        // }, 3000);
        timerRef.current = setInterval(nextBookable, 3000);
        return stopPresentation;
    },[nextBookable])


    // Use the timer ID to clear the timer.
    function stopPresentation() {
        clearInterval(timerRef.current)
    }

    function changeGroup (event) {
        // dispatch({
        //     type: "SET_GROUP",
        //     payload: event.target.value
        // })
        const bookablesInSelectedGroup = bookables.filter(
            b => b.group === event.target.value
          );
          setBookable(bookablesInSelectedGroup[0]);
    }

    function changeBookable (selectedBookable){
        // dispatch({
        //     type: "SET_BOOKABLE",
        //     payload: selectedIndex
        // });
        setBookable(selectedBookable);
        nextButtonRef.current.focus()
    }

    function nextBookable () {
        // dispatch ({ type: "NEXT_BOOKABLE"});
        const i = bookablesInGroup.indexOf(bookable);
        const nextIndex = (i + 1) % bookablesInGroup.length;
        const nextBookable = bookablesInGroup[nextIndex];
        setBookable(nextBookable);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
    }

    if(error){
        return <p>{error.message}</p>
    }

    if (isLoading) {
        return <p><Spinner/> Loading bookables...</p>
    }

  return ( 
    <div>
        <select value={group} onChange={changeGroup} >
            {groups.map(g => <option value={g} key={g}>{g}</option>)}
        </select>
        <ul className="bookables items-list-nav">
            {bookablesInGroup.map((b, _idx) => (
                <li
                    key={b.id}
                    className={b.id === bookable.id ? "selected" : null}
                >
                    <button 
                        className="btn" 
                        onClick={() => changeBookable(b)}
                    >
                        {b.title}
                    </button>
                </li>
            ))}
        </ul>
        <p> 
            <button 
                className="btn" 
                onClick={nextBookable} 
                ref={nextButtonRef} 
                autoFocus
            >
                <FaArrowRight/>
                <span>Next</span>
            </button>
        </p>
    </div>
  )
}

export default BookablesList