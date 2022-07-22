import AuthUserContext from "../context/AuthUserProvider.js";
import { useContext} from "react";


function useUserAuth() {
  const value = useContext(AuthUserContext);
  return value;
  
}

export default useUserAuth