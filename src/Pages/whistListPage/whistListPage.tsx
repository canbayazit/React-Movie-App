import React from 'react'
import WhistList from '../../Components/WhistList/WhistList'
import styles from "./home.module.scss";

const whistListPage = () => {
  return (
    <div className={styles.container}>
        <WhistList/>
    </div>
  )
}

export default whistListPage