import React from 'react'
import Detail from '../../Components/Movie/Detail/Detail';
import MovieList from '../../Components/Movie/List/MovieList';
import styles from './movieDetail.module.scss';
const MovieDetail = () => {
  return (
    <div className={styles.container}>
      <Detail/>
      <MovieList/>
    </div>
  )
}

export default MovieDetail