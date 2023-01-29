import React from 'react'
import { useParams } from 'react-router-dom';
import { imageSize } from '../../../Store/constant';
import { useGetCreditServiceQuery } from '../../../Store/services';
import styles from "./cast.module.scss";

const Cast = () => {
  const { category, id } = useParams();
  const credit = useGetCreditServiceQuery({ category: category!, id: id! });

  return (
    <div className={styles.container_nav_content_cast}>
          {credit.data?.cast.map((item, i) => (
            <div
              key={`${i}_${item.name}`}
              className={styles.container_nav_content_cast_profil}
            >
              <div className={styles.container_nav_content_cast_profil_img}>
                <img src={`${imageSize}${item.profile_path}`} alt="" />
              </div>
              <div className={styles.container_nav_content_cast_profil_info}>
                <h4>{item.original_name}</h4>
                <span>{item.character}</span>
              </div>
            </div>
          ))}
        </div>
  )
}

export default Cast