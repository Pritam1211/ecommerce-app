import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import {toast} from 'react-toastify'
import { environment } from '../environment';
import axios from 'axios'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import styled from 'styled-components';
import { Colors } from '../constants/Colors';

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({});
  const [auth, setAuth] = useAuth();
  const location = useLocation();

  const handleSubmit = async (e) =>{
    try {
      e.preventDefault();
      const res = await axios.post(`${environment.apiUrl}auth/login`, values);

      if(res.data && res.data.success) {
        setAuth({...auth, user: res.data.user, token: res.data.token});
        
        navigate(location.state || "/");
      } else {
        toast.error(res.data.msg);
      }

    } catch(err) {
      toast.error("something went wrong");
    }
  }

  const handleChange = (event) => {
    setValues({...values, [event.target.name]: event.target.value});
  }
  return (
    <Layout>
      <FormContainer>
        <form onSubmit={event => handleSubmit(event)}>
          <div className='brand'>
            <h1>Ecommerce</h1>
          </div>
          <input type='email' placeholder='Email' name='email' onChange={e => handleChange(e)} required />
          <input type='password' placeholder='Password' name='password' onChange={e => handleChange(e)} required />
          <button type='submit'>Login</button>
          <span>Already have an account? <Link to='/register'>Register</Link></span>
        </form>
      </FormContainer>
    </Layout>
  )
}

const FormContainer = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.peach};
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    background-color: ${Colors.spicedApple};
    gap: 1rem;
    border-radius: 2rem;
    padding: 2rem 3rem;
  }
  input {
    background-color: transparent;
    padding: 0.5rem;
    border: 0.1rem solid ${Colors.coral};
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    &:focus {
      border: 0.1rem solid ${Colors.peach};
      outline: none;
    }
  }
  button {
    background-color: ${Colors.coral};
    color: white;
    padding: 0.5rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    text-transform: uppercase;
    &:hover {
      background-color: ${Colors.coral};
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: ${Colors.coral};
      text-decoration: none;
      font-weight: bold;
    }
  }
`
export default Login