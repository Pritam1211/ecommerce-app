import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { toast } from "react-toastify";
import { environment } from "../environment";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Colors } from "../constants/Colors";

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (values.password !== values.cpassword) {
        toast.error("Password and confirm password does not match");
      } else {
        
        console.log(`${environment.apiUrl}auth/register`)

        const res = await axios.post(
          `${environment.apiUrl}auth/register`,
          {
            password: values.password,
            name: values.name,
            email: values.email,
            phone: values.phone,
            address: values.address
          }
        );
        
        console.log(`${environment.apiUrl}/api/auth/register`)
        if (res.data && res.data.success) {
          navigate("/login");
        } else {
          toast.error(res.data.msg);
        }
      }
    } catch (err) {
      console.log(err)
      toast.error("something went wrong");
    }
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <Layout>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <h3>Ecommerce</h3>
          </div>
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={(e) => handleChange(e)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
            required
          />
          <input
            type="text"
            placeholder="Phone"
            name="phone"
            onChange={(e) => handleChange(e)}
            required
          />
          <input
            type="text"
            placeholder="Address"
            name="address"
            onChange={(e) => handleChange(e)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="cpassword"
            onChange={(e) => handleChange(e)}
            required
          />
          <button type="submit">Create Account</button>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
    </Layout>
  );
};

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
export default Register;
