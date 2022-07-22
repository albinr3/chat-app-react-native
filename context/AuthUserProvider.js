import { onAuthStateChanged } from "firebase/auth";
import React, {useState, useEffect, createContext} from "react";
import auth from "../config/firebase";

const AuthUserContext = createContext();

export const AuthUserProvider = (props) => {

    const {children} = props;
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const logOut = onAuthStateChanged(auth, async authenticatedUser => {
            authenticatedUser ? setUser(authenticatedUser) : setUser(null);
            setLoading(false)
        })

        return () => logOut();
          
    }, [user])

    
    return(
        <AuthUserContext.Provider value={{
            user, 
            setUser, 
        }}>

            {children}

        </AuthUserContext.Provider>
    )

}

export default AuthUserContext