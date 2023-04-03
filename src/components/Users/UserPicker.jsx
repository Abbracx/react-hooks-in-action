import { useState, useEffect } from "react";
import Spinner from "../UI/Spinner";
// import UserContext, { UserSetContext } from "./UserContext";
import useFetch from "../../utils/useFetch";
import { useUser } from "./UserContext";

const UserPicker = () => {

  const [user, setUser] = useUser()
  // const [users, setUsers ] = useState(null);
  const { data: users = [], status, error } = useFetch("http://localhost:3001/users")


  useEffect(() => {
    // async function getUsers(){
    //   const resp = await fetch("http://localhost:3001/users")
    //   const data = await resp.json()
    //   // setUsers(data)
    // }
    // getUsers();
    setUser(users[0])
  }, [setUser, users])

    function handleSelect(e) {

      const selectedID = parseInt(e.target.value, 10)
      const selectedUser = users.find( u => u.id === selectedID)

      setUser(selectedUser)

    }

    if (status === "loading"){
      return <Spinner />
    }

    if(status === "error"){
      return <p>{error.message}</p>
    }

    return (
      <select
          className="user-picker"
          onChange={handleSelect}
          value={user?.id}
        >
          {users.map(u => (
        <option key={u.id} value={u.id}>{u.name}</option> ))}
      </select>
    )
}

export default UserPicker