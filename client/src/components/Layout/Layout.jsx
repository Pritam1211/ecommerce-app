import React from "react";
import Header from "./Header";
import Footbar from "./Footbar";
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
const Layout = (props) => {
  return (
    <>
      <Header />
      <main className="main">{props.children}</main>
      <ToastContainer position="top-center" />
      <Footbar />
    </>
  );
};

export default Layout;
