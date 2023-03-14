import React from 'react'
import { Outlet } from 'react-router';
import styles from "./list.module.scss";

const whistListPage = () => {
  return (
    <div className={styles.container}>
        <Outlet/>
    </div>
  )
}

export default whistListPage