import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { logo } from "../../Assets/svg/svg";
import styles from "./header.module.scss";
interface INavItem {
  id: number;
  name: string;
  to: string;
}
const headerList: INavItem[] = [
  { id: 1, name: "Ana Sayfa", to: "/" },
  { id: 2, name: "Listelerim", to: "/myList" },
  { id: 3, name: "Favorilerim", to: "/favorites" },
];
const Header = () => {
  const [isScrolling, setScrolling] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY >= 80 ? setScrolling(true) : setScrolling(false);
    });
  }, [])
  
  return (
    <header className={isScrolling ? `${styles.container} ${styles.active}` :styles.container}>
      <div className={styles.container_logo}>
        <NavLink to={"/"}>
          <span>{logo()}</span>
          <h1>
            Film<span>Makinası</span>
          </h1>
        </NavLink>
      </div>
      <div className={styles.container_login}>
        {headerList.map((item: INavItem) => (
          <NavLink
            key={item.id}
            to={item.to}
            // style={({ isActive }) => ({
            //   // borderBottom: isActive ? "2px solid #6ecfff" : "#fff",
            //   paddingBottom: isActive ? "8px" : "",
            //   textShadow: isActive ? "0 0 30px #6ecfff" : "",
            // })}
          >
            {item.name}
          </NavLink>
        ))}
        <div className={styles.indicator}></div>

        <button>Giriş</button>
      </div>
    </header>
  );
};

export default Header;
