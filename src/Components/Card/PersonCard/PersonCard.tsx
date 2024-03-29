import { imageSize } from '../../../Store/constant';
import { useGetDetailServiceQuery } from '../../../Service/movieServices';
import notFoundImage from "../../../Assets/img/personUser.png";
import styles from "./person.module.scss";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
interface IProps{
   id:number
}
const PersonCard = (props:IProps) => {
    const {id} = props
  const { t, i18n } = useTranslation();
    const {data} = useGetDetailServiceQuery({
        category:"person",
        id:id.toString(),
        lang: i18n.language.replace("_","-")
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
                <p>{data?.biography || t('notFoundBio')}</p>
                <button><Link to={`/detail/person/${id}`}>{t('seeMore')}</Link></button>
        </div>
    </div>
  )
}

export default PersonCard