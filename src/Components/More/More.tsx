import styles from "./more.module.scss";
import { arrowDown } from "../../Assets/svg/svg";
import { Link } from "react-scroll";
const More = () => {
  return (
    <div className={styles.container} >
      <Link
        react-scrollink
        activeClass="active"
        to="content"
        spy={true}
        smooth={true}
        offset={-50}
        duration={500}
      >
        <span>MORE</span>
        <span>{arrowDown("#7fffd4")}</span>
      </Link>
    </div>
  );
};

export default More;
