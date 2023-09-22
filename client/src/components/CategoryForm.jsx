import React from "react";
import { Colors } from "../constants/Colors";
import styled from "styled-components";

const CategoryForm = ({ name, setName, isEdit, handleSubmit }) => {
  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <Container>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input
          type="text"
          name="name"
          onChange={(e) => handleChange(e)}
          value={name}
          required
        />
        <button type="submit">{isEdit ? "Edit" : "Create"}</button>
      </form>
    </Container>
  );
};

const Container = styled.div`
  margin: 1rem auto;
  width: 100%;
  form {
    width: 100%;
    display: flex;
    gap: 1rem;
    padding: 2rem 3rem;
  }
  input {
    background-color: transparent;
    padding: 0.5rem;
    border: 0.1rem solid ${Colors.coral};
    border-radius: 0.4rem;
    width: 100%;
    &:focus {
      border: 0.1rem solid ${Colors.peach};
      outline: none;
    }
  }
  button {
    background-color: ${Colors.spicedApple};
    color: white;
    padding: 0.5rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    text-transform: uppercase;
    &:hover {
      background-color: ${Colors.peach};
    }
  }
`
export default CategoryForm;