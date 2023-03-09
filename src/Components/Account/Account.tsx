import React from "react";
import { shallowEqual } from "react-redux";
import { pencil } from "../../Assets/svg/icons/editingPencil";
import { useAppSelector } from "../../Hooks/Hook";
import styles from "./account.module.scss";
import { useNavigate } from "react-router";

const Account = () => {
  const user = useAppSelector((store) => store.auth.user, shallowEqual);
  const navigate = useNavigate();
  const handleChangeMail = (route: string) => {
    navigate(`${route}`);
  };
  return (
    <div className={styles.container}>
      <h1>Account</h1>
      <div className={styles.container_email}>
        <p>Email: {user.email}</p>
        <span onClick={() => handleChangeMail("email")}>{pencil()}</span>
      </div>
      <div className={styles.container_password}>
        <p>Password: ******</p>
        <span onClick={() => handleChangeMail("password")}>{pencil()}</span>
      </div>
      <div className={styles.container_username}>
        <p>Username: {user.displayName}</p>
        <span onClick={() => handleChangeMail("username")}>{pencil()}</span>
      </div>
      <div className={styles.container_button}>
        <button>Delete Account</button>
      </div>
    </div>
  );
};

export default Account;
