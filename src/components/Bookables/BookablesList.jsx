import { useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {FaArrowRight} from "react-icons/fa";
// import getData from "../../utils/api";


const BookablesList = ({ bookable, bookables, getUrl }) => {

  

    // Get group of that specific bookable
    const group = bookable?.group;
   
    // Get bookables that belong to the group above
    const bookablesInGroup = bookables.filter(b => b.group === group); 
    // Get unique bookables
    const groups = [...new Set(bookables.map(b => b.group))]; 

    const navigate = useNavigate()
    const timerRef =  useRef(null)
    const nextButtonRef = useRef()

    const nextBookable = useCallback( () => {
        const i = bookablesInGroup.indexOf(bookable);
        const nextIndex = (i + 1) % bookablesInGroup.length;
        const nextBookable = bookablesInGroup[nextIndex];
        navigate(getUrl(nextBookable.id));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    },[bookable, bookablesInGroup, getUrl, navigate])
    
   
    // Run an effect when the component first mounts.
    useEffect(() => {
        timerRef.current = setInterval(nextBookable, 3000);
        return stopPresentation;
    },[nextBookable])


    // Use the timer ID to clear the timer.
    function stopPresentation() {
        clearInterval(timerRef.current)
    }

    function changeGroup (event) {
        const bookablesInSelectedGroup = bookables.filter(
            b => b.group === event.target.value
          );
         navigate(getUrl(bookablesInSelectedGroup[0].id));
    }

    function changeBookable (selectedBookable){
        nextButtonRef.current.focus()
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