import React from 'react'
import { imageSize } from '../../../Store/constant';
import { useGetDetailServiceQuery } from '../../../Store/services';
import notFoundImage from "../../../Assets/img/personUser.png";
import styles from "./person.module.scss";
import { Link } from 'react-router-dom';
interface IProps{
   id:number
}
const PersonCard = (props:IProps) => {
    const {id} = props
    const {data} = useGetDetailServiceQuery({
        category:"person",
        id:id.toString()
    })
  return (
    <div className={styles.container}>
        <div className={styles.container_img}>
            <img src={data?.profile_path
                ? `${imageSize}${data?.profile_path}`
                : notFoundImage} alt="" />
        </div>
        <div className={styles.container_info}>
                <h2>{data?.name}</h2>
                <p>{data?.biography}</p>
                <button><Link to={`/person/${id}`}>See More</Link></button>
        </div>
    </div>
  )
}

export default PersonCard