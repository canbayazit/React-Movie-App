import React from "react";
import { shallowEqual } from "react-redux";
import { pencil } from "../../Assets/svg/icons/editingPencil";
import { useAppSelector } from "../../Hooks/Hook";
import styles from "./account.module.scss";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const Account = () => {
  const user = useAppSelector((store) => store.auth.user, shallowEqual);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleChangeMail = (route: string) => {
    navigate(`${route}`);
  };
  return (
    <div className={styles.container}>
      <h1>{t('account')}</h1>
      <div className={styles.container_email}>
        <p>{t('emailPlaceholder')}: {user.email}</p>
        <span onClick={() => handleChangeMail("email")}>{pencil()}</span>
      </div>
      <div className={styles.container_password}>
        <p>{t('passwordPlaceholder')}: ******</p>
        <span onClick={() => handleChangeMail("password")}>{pencil()}</span>
      </div>
      <div className={styles.container_username}>
        <p>{t('usernamePlaceholder')}: {user.displayName}</p>
        <span onClick={() => handleChangeMail("username")}>{pencil()}</span>
      </div>
      <div className={styles.container_button}>
        <button>{t('deleteAccount')}</button>
      </div>
    </div>
  );
};

export default Account;
