import styles from "./more.module.scss";
import { arrowDown } from "../../Assets/svg/icons/arrows";
import { Link } from "react-scroll";
import { useTranslation } from "react-i18next";
const More = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.container} >
      <Link
        react-scrollink="true"
        activeClass="active"
        to="content"
        spy={true}
        smooth={true}
        offset={-60}
        duration={500}
      >
        <span>{t('more')}</span>
        <span>{arrowDown("#62b4f5")}</span>
      </Link>
    </div>
  );
};

export default More;
