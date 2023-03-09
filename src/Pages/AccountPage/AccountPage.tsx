import React from "react";
import { Outlet } from "react-router";
import Account from "../../Components/Account/Account";
import styles from "./account.module.scss";

const AccountPage = () => {

  return (
    <div className={styles.container}>
      <Outlet/>
    </div>
  );
};

export default AccountPage;
