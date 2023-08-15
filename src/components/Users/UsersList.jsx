import { useEffect } from 'react';
import { useQuery } from 'react-query'
import getData from '../../utils/api';
import Spinner from "../UI/Spinner";

const UsersList = ({user, setUser }) => { 

    const { data: users = [], status, error } = useQuery("users", () => getData("http://localhost:3001/users"))

    useEffect(()=>{
        setUser(users[0])       
    }, [users, setUser])

    if(status === "loading"){
        return <Spinner />
    }

    if(status === "error"){
        return <p>{error.message}</p>
    }

    return (
        <ul className="users items-list-nav">
            {users.map((usr, _idx) => (
                <li
                    key={usr.id}
                    className={usr.id === user?.id ? "selected" : null}
                >
                    <button 
                        className="btn" 
                        onClick={() => setUser(usr)}
                    >
                        {usr.name}
                    </button>
                </li>
            ))}
        </ul>
    )
}

export default UsersList 