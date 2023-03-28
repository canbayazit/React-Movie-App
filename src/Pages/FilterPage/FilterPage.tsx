import React from 'react'
import FilterMovieTv from '../../Components/Filter/FilterMovieTv';
import styles from './filter.module.scss';

const FilterPage = () => {
  return (
    <div className={styles.container}>
        <FilterMovieTv/>
    </div>
  )
}

export default FilterPage