import {useState, useEffect } from 'react';
import getData from '../../utils/api';
import useFetch from '../../utils/useFetch';
import Spinner from "../UI/Spinner";

const UsersList = ({user, setUser }) => { 

    // const [ users, setUsers ] = useState(null)
    // const [ isLoading, setIsLoading ] = useState(true)
    // const [ error, setError ] = useState(null)
    const { data: users = [], status, error } = useFetch("http://localhost:3001/users")

    useEffect(()=>{
        // async function getUsers(){
        //     try {
        //         const data = await getData("http://localhost:3001/users")
        //         setUser(data[0])
        //         setUsers(data)
        //         setIsLoading(false)
        //     } catch (error) {
        //         setError(error)
        //         setIsLoading(false)
        //     }
        // }
        // getUsers() 
        setUser(users[0])       
    }, [users, setUser])

    if(status === "loading"){
        return <p><Spinner /> Loading users...</p>
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