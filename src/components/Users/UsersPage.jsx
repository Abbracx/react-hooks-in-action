import { useState } from "react";

import UsersList from "./UsersList";
import UserDetails from "./UserDetails";
import { useContext } from "react";
// import UserContext from "./UserContext";
import { useUser } from "./UserContext";

const UsersPage = () => {

  const [user, setUser] = useState(null)

  /* 
    The colon syntax lets us assign a property to a differently 
    named variable when destructuring an object. 
  */
  // const loggedInUser  = useContext(UserContext)
  const { user: loggedInUser } = useUser()

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