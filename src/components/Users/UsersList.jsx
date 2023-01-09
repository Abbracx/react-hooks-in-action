import data from "../../static.json";
import {useState, useEffect, Fragment} from 'react'

const UsersList = () => {
    const [ users, setUsers ] = useState([])
    const [userIndex, setUserIndex] = useState(1);
    const user = users[userIndex]

    useEffect(()=>{
        setUsers(data.users)
    }, [])
    return (
        <Fragment>
            <div>
                <ul className="bookables items-list-nav">
                    {users.map((user, idx) => (
                        <li
                            key={user.id}
                            className={idx === userIndex ? "selected" : null}
                        >
                            <button 
                                className="btn" 
                                onClick={() => setUserIndex(idx)}
                            >
                                {user.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            { user && (
                <div className="bookable-details">
                    <div className="item">
                        <div className="item-header">
                            <h2>{user.name}</h2>
                            {/* <span className="controls">
                                <label>
                                    <input
                                    type="checkbox"
                                    checked={hasDetails}
                                    onChange={() => setHasDetails(has => !has)}
                                    />
                                        Show Details
                                </label>
                            </span> */}
                        </div>
                        <p>{user.title}</p>
        
                        {/* {hasDetails && (
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
                        )}  */}
                    </div>
                </div> 
            )}
        </Fragment>
      )
}

export default UsersList 