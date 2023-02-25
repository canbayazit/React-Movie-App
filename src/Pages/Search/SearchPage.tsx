import React from 'react'
import Search from '../../Components/Search/Search'
import styles from "./searchPage.module.scss";

const SearchPage = () => {
  return (
    <div className={styles.container}>
        <Search/>
    </div>
  )
}

export default SearchPage