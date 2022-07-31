import { onAuthStateChanged } from "firebase/auth";
import React, {useState, useEffect, createContext} from "react";
import auth from "../config/firebase";

const AuthUserContext = createContext();

export const AuthUserProvider = (props) => {

    const {children} = props;
    const [user, setUser] = useState(null)
    const [rooms, setRooms] = useState([])
    const [unfilteredRooms, setUnfilteredRooms] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const logOut = onAuthStateChanged(auth, authenticatedUser => { //this observer get excuted even inside an useeffect
            setLoading(false) 
            authenticatedUser ? setUser(authenticatedUser) : setUser(null);
            
        })

        return ()=> logOut;
          
    }, [])

    
    return(
        <AuthUserContext.Provider value={{
            user, 
            setUser,
            loading,
            rooms,
            setRooms,
            unfilteredRooms,
            setUnfilteredRooms
        }}>

            {children}

        </AuthUserContext.Provider>
    )

}

export default AuthUserContext