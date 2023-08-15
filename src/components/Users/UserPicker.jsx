import { useEffect } from "react";
import { useQuery } from "react-query"
import Spinner from "../UI/Spinner";
import getData from "../../utils/api";
import { useUser } from "./UserContext";

const UserPicker = () => {

  const [ user, setUser ] = useUser()
  // const [users, setUsers ] = useState(null);
  const { data: users = [], status, error } = useQuery("users", () => getData("http://localhost:3001/users"))


  useEffect(() => {
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