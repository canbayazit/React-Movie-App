import React from 'react'
import { useGetDetailServiceQuery } from '../../../Store/services'
import { IICon } from '../../../Types/state'
import MovieCard from '../../Card/MovieCard/MovieCard'
import styles from "./whistItem.module.scss";

interface IProps{
    movie:IICon
    active:boolean
}
const WhistItem = (props:IProps) => {
    const {movie,active}=props
   
    const{data,isLoading}= useGetDetailServiceQuery({category:movie.category,id:movie.id.toString()})
  return (
    <div className={styles.container}>
        <MovieCard movie={data!} categoryType={movie.category} active={active}/>
    </div>
  )
}

export default WhistItem;