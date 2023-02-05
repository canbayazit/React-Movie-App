import React from 'react'
import Detail from '../../Components/Movie/Detail/Detail';
import NavList from '../../Components/Movie/List/NavList';
import styles from './detailPage.module.scss';
const DetailPage = () => {
  return (
    <div className={styles.container}>
      <Detail/>
      <NavList/>
    </div>
  )
}

export default DetailPage