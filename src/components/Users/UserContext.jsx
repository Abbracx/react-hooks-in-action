import { useState, useContext, createContext } from "react";

const UserContext = createContext();
const UserSetContext = createContext()

// Export the context object so that other components can import it.


/* 
    a. Assign the special children prop to a local variable.
    b. Manage the user state within the component.
    c. Set an object as the context value.
    d. Render the children inside the provider.
*/
export function UserProvider({children}){
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={user} >
            <UserSetContext.Provider value={setUser}>
                {children}
            </UserSetContext.Provider>
        </UserContext.Provider>
    )

}

export function useUser() {
    const user = useContext(UserContext)
    const setUser = useContext(UserSetContext)

    if(!setUser) {
        throw new Error("The UserProvider is missing...")
    }

    return [user, setUser]
}
/*  
    We assign an object, {user, setUser}, to the value prop of the provider.
    Every time the component renders, it’s a fresh object that’s assigned, 
    even if the two properties, user and setUser, are the same. 
    The consumers of the context—UserPicker, Users- Page, and BookingDetails—re-render 
    whenever UserProvider re-renders.
    Also, by using an object as the value, if a nested component uses only one of the properties on the object, 
    it will still re-render when the other property changes (it’s tidbits and tacos again).
    So, we have two problems:

    a. A new object is assigned to the provider value every render.
    b. Changing one property on the value re-renders consumers that may not consume that value.

    We can solve both problems by using two contexts rather than one in our custom provider.

    #PROBLEM
    <UserContext.Provider value={{user, setUser}} >
        {children}
    </UserContext.Provider>

    #SOLUTION
    <UserContext.Provider value={{user}} >
        <UserSetContext.Provider value={{setUser}}>
            {children}
        </UserSetContext.Provider>
    </UserContext.Provider>
*/