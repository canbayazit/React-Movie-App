import React from 'react'
import FilterMovieTv from '../../Components/Filter/FilterMovieTv';
import { UpcomingSlider } from '../../Components/Sliders';
import styles from './filter.module.scss';

const FilterPage = () => {
  return (
    <div>
        <UpcomingSlider/>
        <FilterMovieTv/>
    </div>
  )
}

export default FilterPage