import React from 'react'
import WhistlistFavorites from '../../Components/WhistList/WhistlistFavorites'
import styles from "./home.module.scss";

const whistListPage = () => {
  return (
    <div className={styles.container}>
        <WhistlistFavorites/>
    </div>
  )
}

export default whistListPage