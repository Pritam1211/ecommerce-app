import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext =  createContext();

const AuthProvider = ({children}) =>{

  const [auth, setAuth] = useState({
    user: null,
    token: null
  });

  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem("auth"));
    if(data && data.user) {
      setAuth((auth) => ({...auth, user: data.user, token: data.token}))
    }
  }, []);

  useEffect(()=> {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth])


  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  )

}

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider }