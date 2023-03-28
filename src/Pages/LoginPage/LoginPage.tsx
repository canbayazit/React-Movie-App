import { Outlet } from "react-router";
import styles from "./loginPage.module.scss";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <Outlet/>   
    </div>
  );
};

export default LoginPage;
