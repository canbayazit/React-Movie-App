import React from 'react'
import { useParams } from 'react-router-dom';
import MovieTvDetail from '../../Components/Detail/MovieTvDetail/MovieTvDetail';
import PersonDetail from '../../Components/Detail/PersonDetail/PersonDetail';
import NavList from '../../Components/List/NavList';
import styles from './detailPage.module.scss';
const DetailPage = () => {
  const { category } = useParams();
  return (
    <div className={styles.container}>
      {category === "person" ? <PersonDetail /> : <MovieTvDetail/>}      
      <NavList/>
    </div>
  )
}

export default DetailPage