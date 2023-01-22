import React from 'react'
import Detail from '../../Components/Movie/Detail/Detail';
import MovieList from '../../Components/Movie/List/MovieList';
import styles from './detailPage.module.scss';
const DetailPage = () => {
  return (
    <div className={styles.container}>
      <Detail/>
      <MovieList/>
    </div>
  )
}

export default DetailPage