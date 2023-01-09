import { useReducer, Fragment } from "react";
import data from "../../static.json";
import {FaArrowRight} from "react-icons/fa";
import reducer from "./reducer";


const initialState = {
    group: "Rooms",
    bookableIndex: 0,
    hasDetails: true,
    bookables: data.bookables
};

const BookablesList = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [group, bookableIndex, bookables, hasDetails] = state;
    const bookablesInGroup = data.bookables.filter(b => b.group === group);
    const bookable = bookablesInGroup[bookableIndex];
    const groups = [...new Set(data.bookables.map(b => b.group))];

    
    function changeGroup (event) {
        dispatch({
            type: "SET_GROUP",
            payload: event.target.value
        })
    }

    function changeBookable (selectedIndex){
        dispatch({
            type: "SET_BOOKABLE",
            payload: selectedIndex
        });
    }

    function nextBookable () {
        dispatch ({ type: "NEXT_BOOKABLE"});
    }

    function toggleDetails () {
        dispatch ({ type: "TOGGLE_HAS_DETAILS" });
    }

  return (
    <Fragment>
    <div>
        <select
            value={group}
            onChange={changeGroup}
        >
        {groups.map(g => <option value={g} key={g}>{g}</option>)}
        </select>
        <ul className="bookables items-list-nav">
            {bookablesInGroup.map((bookables, idx) => (
                <li
                    key={bookables.id}
                    className={idx === bookableIndex ? "selected" : null}
                >
                    <button 
                        className="btn" 
                        onClick={() => changeBookable(idx)}
                    >
                        {bookables.title}
                    </button>
                </li>
            ))}
        </ul>
        <p> 
        <button className="btn" onClick={nextBookable} autoFocus >
            <FaArrowRight/>
            <span>Next</span>
        </button>
        </p>
    </div>
    { bookable && (
        <div className="bookable-details">
            <div className="item">
                <div className="item-header">
                    <h2>{bookable.title}</h2>
                    <span className="controls">
                        <label>
                            <input
                            type="checkbox"
                            checked={hasDetails}
                            onChange={toggleDetails}
                            />
                                Show Details
                        </label>
                    </span>
                </div>
                <p>{bookable.notes}</p>

                {hasDetails && (
                    <div className="item-details">
                        <h3>Availability</h3>
                        <div className="bookable-availability">
                            <ul>
                                {bookable.days.sort().map(d => <li key={d}>{data.days[d]}</li>)}
                            </ul> 
                            <ul>
                                {bookable.sessions
                                .map(s => <li key={s}>{data.sessions[s]}</li>)
                                } 
                            </ul>
                        </div>
                    </div>
                )} 
            </div>
        </div> 
    )}
    </Fragment>
  )
}

export default BookablesList