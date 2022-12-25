import React from 'react'
import { imageOriginal } from '../../../../Store/constant';
import styles from "./slideItem.module.scss";

const SlideItem = (props:any) => {
  return (
    <div
    key={props.movie.id}
    className={styles.container_background}
    style={{ backgroundImage:`url("${imageOriginal}${props.movie.backdrop_path}")` }}
  >
    {/* <img src="https://image.tmdb.org/t/p/w500//7zQJYV02yehWrQN6NjKsBorqUUS.jpg" alt="" /> */}
    <h1>asd</h1>
  </div>
  )
}

export default SlideItem