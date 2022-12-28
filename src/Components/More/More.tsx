import styles from "./more.module.scss";
import { arrowDown } from "../../Assets/svg/svg";
import { Link } from "react-scroll";
const More = () => {
  return (
    <div className={styles.container} >
      <Link
        react-scrollink="true"
        activeClass="active"
        to="content"
        spy={true}
        smooth={true}
        offset={-95}
        duration={500}
      >
        <span>MORE</span>
        <span>{arrowDown("#0f0f0f")}</span>
      </Link>
    </div>
  );
};

export default More;
