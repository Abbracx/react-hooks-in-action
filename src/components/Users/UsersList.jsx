import data from "../../static.json";
import {useState, useEffect} from 'react'

const UsersList = () => {
    const [ users, setUsers ] = useState([])
    const [userIndex, setUserIndex] = useState(1);

    useEffect(()=>{
        setUsers(data.users)
    }, [])
  return (
    <ul className="users items-list-nav">
        {users.map((user, idx) => (
            <li 
            key={user.id}
            className={idx + 1 === userIndex ? "selected" : null}
            >
                <button className="btn" onClick={() => setUserIndex(user.id)}>
                {user.name}
            </button>
            </li>
        ))}
    </ul>
  )
}

export default UsersList 