import React from "react";
import { Outlet, useLocation } from "react-router";
import styles from "./loginPage.module.scss";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <Outlet/>   
    </div>
  );
};

export default LoginPage;
