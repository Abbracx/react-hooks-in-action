import { useState, Fragment } from "react";
import data from "../../static.json";
import {FaArrowRight} from "react-icons/fa";

const BookablesList = () => {
    const [group, setGroup] = useState("Kit")
    const bookablesInGroup = data.bookables.filter(b => b.group === group);
    const [bookableIndex, setBookableIndex] = useState(0);
    const groups = [...new Set(data.bookables.map(b => b.group))];

    const bookable = bookablesInGroup[bookableIndex];
    const [hasDetails, setHasDetails] = useState(false);

    function nextBookable () { ; 
        setBookableIndex(i => (i + 1) % bookablesInGroup.length);
    }
  return (
    <Fragment>
    <div>
        <select
            value={group}
            onChange={(e) => setGroup(e.target.value)}
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
                        onClick={() => setBookableIndex(idx)}
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
                            onChange={() => setHasDetails(has => !has)}
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