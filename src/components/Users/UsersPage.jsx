import { useState } from "react";

import UsersList from "./UsersList";
import UserDetails from "./UserDetails";
import { useContext } from "react";
import UserContext from "./UserContext";


const UsersPage = () => {

  const [user, setUser] = useState(null)


  const loggedInUser = useContext(UserContext)

  // if no user has been selected in the users list,
  // select the logged in user
  const currentUser =  loggedInUser || user

  return (
    <main>
        <UsersList user={currentUser} setUser={setUser} />
        <UserDetails user={currentUser} />
    </main>
  )
}

export default UsersPage