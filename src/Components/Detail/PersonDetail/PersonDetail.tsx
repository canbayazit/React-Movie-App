import { useParams } from "react-router";
import { imageSize } from "../../../Store/constant";
import { useGetDetailServiceQuery } from "../../../Service/movieServices";
import notFoundImage from "../../../Assets/img/personUser.png";
import styles from "./personDetail.module.scss";
import i18n from "../../../Assets/i18n";
import { useTranslation } from "react-i18next";

const PersonDetail = () => {
  const { category, id } = useParams();
  const { t } = useTranslation();
  const { data, isLoading } = useGetDetailServiceQuery({
    category: category!,
    id: id!,
    lang:i18n.language.replace("_","-")
  });
  
  return (
    <>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div className={styles.container}>
          <div className={styles.container_img}>
            <img src={data?.profile_path
                ? `${imageSize}${data?.profile_path}`
                : notFoundImage} alt="" />
          </div>
          <section className={styles.container_detail}>
            <h1>{data?.name}</h1>
            <div className={styles.container_detail_bio}>
              <h3>{t('biography')}</h3>
              <p>{data?.biography || t('notFoundBio')}</p>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default PersonDetail;
