import React, { useEffect, useState } from 'react'
import { imageSize } from '../../../Store/constant';
import { useGetDetailServiceQuery } from '../../../Service/movieServices';
import notFoundImage from "../../../Assets/img/personUser.png";
import styles from "./person.module.scss";
import { Link } from 'react-router-dom';
import i18n from '../../../Assets/i18n';
import { useTranslation } from 'react-i18next';
interface IProps{
   id:number
}
const PersonCard = (props:IProps) => {
    const {id} = props
  const [lang, setLang] = useState<string>(i18n.language.replace("_","-"));
  const { t } = useTranslation();
    const {data,isFetching} = useGetDetailServiceQuery({
        category:"person",
        id:id.toString(),
        lang:lang
    })
    useEffect(() => {
      if (!isFetching) {
        if (!data?.biography) {
          setLang('en-EN')
        }
      }    
    }, [data?.biography, isFetching])
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
                <button><Link to={`/person/${id}`}>{t('seeMore')}</Link></button>
        </div>
    </div>
  )
}

export default PersonCard