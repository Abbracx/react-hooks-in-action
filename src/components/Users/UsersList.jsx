import {useState, useEffect, Fragment} from 'react';
import getData from '../../utils/api';
import Spinner from "../UI/Spinner";

const UsersList = ({user, setUser }) => { 

    const [ users, setUsers ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(true)
    const [ error, setError ] = useState(null)

    useEffect(()=>{
        async function getUsers(){
            try {
                const data = await getData("http://localhost:3001/users")
                setUser(data[0])
                setUsers(data)
                setIsLoading(false)
            } catch (error) {
                setError(error)
                setIsLoading(false)
            }
        }
        getUsers()        
    }, [setUser])

    if(isLoading){
        return <p><Spinner /> Loading users...</p>
    }

    if(error){
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