import React from "react";
import { imageOriginal, imageSize } from "../../../../Store/constant";
import { useGetGenresServiceQuery } from "../../../../Store/services";
import { Result } from "../../../../Types/upcomingMovies";
import styles from "./slideItem.module.scss";
interface props {
  item: Result;
  index: number;
}

const SlideItem = (props: props) => {
  const { item, index } = props;
  console.log("item",item)
  const {data} = useGetGenresServiceQuery();
  console.log("data",data)

  return (
    <div key={item.id} className={styles.container_background}>
      <img
        src={`${imageOriginal}${item.backdrop_path}`}
        alt=""
        className={styles.container_background_image}
      />
      <div className={styles.container_info}>
        <div className={styles.container_info_overview}>
          <h1>{item.title}</h1>
          <ul>
            {
              item.genre_ids.map((id,i)=>(
                <li key={i}>{data?.genres.findIndex(item=>item.id ===id ? true : false) ? data?.genres[i].name : "" }</li>

              ))
            }
          </ul>
          <p>{item.overview}</p>
        </div>
        <div className={styles.container_info_image}>
          <img src={`${imageSize}${item.poster_path}`} alt="" />
        </div>
      </div>
    </div>
  );
};

export default SlideItem;
