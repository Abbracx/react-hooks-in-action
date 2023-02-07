import {useState, useEffect, Fragment} from 'react'
import getData from '../../utils/api';
// import reducer from "./reducer";
// import getData from "../../utils/api";
import Spinner from "../UI/Spinner";

const UsersList = () => {
    const url = "http://localhost:3001/users"
    const [ users, setUsers ] = useState([])
    const [ error, setError ] = useState("")
    const [userIndex, setUserIndex] = useState(1);
    const user = users[userIndex]

    useEffect(()=>{
        async function getUsers(){
            try {
                const data = await getData(url)
                setUsers(data)
            } catch (error) {
                setError(error)
            }
        }
        getUsers()        
    }, [])

    if(users.length === 0){
        return <Spinner />
    }

    if(error){
        return <p>{error.message}</p>
    }

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