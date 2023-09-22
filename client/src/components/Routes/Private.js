import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { environment } from '../../environment';
import { useAuth } from '../../context/authContext';
import { Outlet } from 'react-router-dom';
import Spinner from '../Spinner';

const Private = () => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(()=>{
    const run = async () => {
      const res = await axios.get(`${environment.apiUrl}auth/user-route`);
      if(res.data.success) setOk(true);
      else setOk(false)
    }
    auth?.token && run();
  }, [auth?.token]);

  return (
    <>
    {
      ok ? <Outlet /> : <Spinner />
    }
    </>
  )
}

export default Private