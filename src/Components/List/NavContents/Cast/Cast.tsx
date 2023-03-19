import { Link, useParams } from "react-router-dom";
import { imageSize } from "../../../../Store/constant";
import { useGetCreditServiceQuery } from "../../../../Service/movieServices";
import user from "../../../../Assets/img/user.png";
import styles from "./cast.module.scss";
import i18n from "../../../../Assets/i18n";

const Cast = () => {
  const { category, id } = useParams();
  const { data } = useGetCreditServiceQuery({
    category: category!,
    id: id!,
    lang: i18n.language.replace("_", "-"),
  });

  return (
    <div className={styles.container_nav_content_cast}>
      {data?.cast.map((item, i) => (
        <Link to={`/detail/person/${item.id}`}>
          <div
            key={`${i}_${item.name}`}
            className={styles.container_nav_content_cast_profil}
          >
            <div className={styles.container_nav_content_cast_profil_img}>
              <img
                src={
                  item.profile_path ? `${imageSize}${item.profile_path}` : user
                }
                alt=""
              />
            </div>
            <div className={styles.container_nav_content_cast_profil_info}>
              <h4>{item.original_name}</h4>
              <span>{item.character}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Cast;
