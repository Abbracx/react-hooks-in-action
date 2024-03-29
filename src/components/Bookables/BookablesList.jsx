import { useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {FaArrowRight} from "react-icons/fa";
// import getData from "../../utils/api";
import useFetch from "../../utils/useFetch";
import Spinner from "../UI/Spinner";


const BookablesList = ({ bookable, bookables, getUrl }) => {

    // const { data: bookables = [], status, error } = useFetch("http://localhost:3001/bookables")

    // const [bookables, setBookables] = useState([]);
    // const [error, setError] = useState(false);
    // const [isLoading, setIsLoading] = useState(true);

    // Get group of that specific bookable
    const group = bookable?.group;
    // const {group, bookableIndex, bookables, isLoading, error} = state;

    // Get bookables that belong to the group above
    const bookablesInGroup = bookables.filter(b => b.group === group); 
    // Get unique bookables
    const groups = [...new Set(bookables.map(b => b.group))]; 

    const navigate = useNavigate()
    const timerRef =  useRef(null)
    const nextButtonRef = useRef()

    // console.log(timerRef);
    // useEffect(()=>{
    //     setBookable(bookables[0])
    // },[bookables, setBookable])
    // useEffect(() => {
        // dispatch({type: "FETCH_BOOKABLES_REQUEST"});

        // getData("http://localhost:3001/bookables")
        //     .then(bookables => {
        //         setBookable(bookables[0]);
        //         setBookables(bookables);
        //         setIsLoading(false);
        //     })
        //     .catch(error => {
        //         setError(error);
        //         setIsLoading(false);
        //     })
            // .then(bookables => dispatch({
            //     type: "FETCH_BOOKABLES_SUCCESS",
            //     payload: bookables
            // }))
            // .catch(error => dispatch({
            //     type: "FETCH_BOOKABLES_ERROR",
            //     payload: error
            // }));
    // }, [setBookable])

    const nextBookable = useCallback( () => {
        // dispatch ({ type: "NEXT_BOOKABLE"});
        const i = bookablesInGroup.indexOf(bookable);
        const nextIndex = (i + 1) % bookablesInGroup.length;
        const nextBookable = bookablesInGroup[nextIndex];
        navigate(getUrl(nextBookable.id));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    },[bookable, bookablesInGroup, getUrl, navigate])
    
   
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
         navigate(getUrl(bookablesInSelectedGroup[0].id));
    }

    function changeBookable (selectedBookable){
        // dispatch({
        //     type: "SET_BOOKABLE",
        //     payload: selectedIndex
        // });
        // setBookable(selectedBookable);
        nextButtonRef.current.focus()
    }

    

    // if(status === "error"){
    //     return <p>{error.message}</p>
    // }

    // if (status === "loading") {
    //     return <p><Spinner/> Loading bookables...</p>
    // }

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
                    <Link
                        to={getUrl(b.id)}
                        className="btn"
                        replace={true}
                    >{b.title}</Link>
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