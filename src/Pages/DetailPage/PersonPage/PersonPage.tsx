import React from 'react'
import Detail from '../../../Components/Person/Detail/Detail';
import styles from './person.module.scss';

const PersonPage = () => {
  return (
    <div className={styles.container}>
        <Detail/>
    </div>
  )
}

export default PersonPage;