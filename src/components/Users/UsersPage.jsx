import { useState } from "react";

import UsersList from "./UsersList";
import UserDetails from "./UserDetails";


const UsersPage = () => {
  const [user, setUser] = useState(null)

  return (
    <main>
        <UsersList user={user} setUser={setUser} />
        <UserDetails user={user} />
    </main>
  )
}

export default UsersPage