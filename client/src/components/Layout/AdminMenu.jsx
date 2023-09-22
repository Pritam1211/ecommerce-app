import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Colors } from "../../constants/Colors";

const AdminMenu = () => {
  return (
    <Container>
      <ul>
        <li>
          <NavLink to="/admin/create-category" className="nav-lin">
            Create Category
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/create-product" className="nav-lin">
            Create Product
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/users" className="nav-lin">
            Users
          </NavLink>
        </li>
      </ul>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  background-color: ${Colors.spicedApple};
  margin-left: 20px;
  border-radius: 10px;
  margin-top: 20px;
  padding: 30px 20px;
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 100%;
    text-align: center;
    li {
      border-bottom: 1px solid ${Colors.peach};
      .nav-lin {
        display: block;
        color: #000;
        padding: 8px 16px;
        text-decoration: none;
        font-size: 17px;
        color: #fff;
      }
      .nav-lin:hover {
        background-color: ${Colors.peach};
        color: #fff;
      }
    }
  }

  /* Change the link color on hover */
`;

export default AdminMenu;
