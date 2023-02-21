import { useContext } from "react";
import { useState, useEffect } from "react";
import Spinner from "../UI/Spinner";
import UserContext, { UserSetContext } from "./UserContext";


const UserPicker = () => {

  const [users, setUsers ] = useState(null);
  const user = useContext(UserContext)
  const setUser = useContext(UserSetContext)

  useEffect(() => {
    async function getUsers(){
      const resp = await fetch("http://localhost:3001/users")
      const data = await resp.json()
      setUsers(data)
      setUser(data[0])
    }
    getUsers();
  }, [setUser])

    function handleSelect(e) {

      const selectedID = parseInt(e.target.value, 10)
      const selectedUser = users.find( u => u.id === selectedID)

      setUser(selectedUser)

    }
    if (users === null ){
      return <Spinner />
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