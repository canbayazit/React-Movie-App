import React from "react";
import { useLocation } from "react-router";
import Login from "../../Components/Login/Login/Login";
import Register from "../../Components/Login/Register/Register";
import styles from "./loginPage.module.scss";

const LoginPage = () => {
  const location = useLocation();
  return (
    <div className={styles.container}>
      {location.pathname === "/login" && <Login />}
      {location.pathname === "/register" && <Register />}
    </div>
  );
};

export default LoginPage;
