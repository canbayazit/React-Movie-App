import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { logo } from "../../Assets/svg/icons/logo";
import styles from "./header.module.scss";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from "formik";
import { search } from "../../Assets/svg/icons/search";
interface INavItem {
  id: number;
  name: string;
  to: string;
}
const headerList: INavItem[] = [
  { id: 1, name: "HOME", to: "/" },
  { id: 2, name: "WATCHLIST", to: "/whistlist" },
  { id: 3, name: "FAVORITES", to: "/favorites" },
];
interface IValues {
  query: string;
}
const Header = () => {
  const [isScrolling, setScrolling] = useState(false);
  const [query, setQuery] = useState<string>("");
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY >= 80 ? setScrolling(true) : setScrolling(false);
    });
  }, []);
  const initialValues: IValues = {
    query: "",
  };
  return (
    <header
      className={
        isScrolling ? `${styles.container} ${styles.active}` : styles.container
      }
    >
      <div className={styles.container_left}>
        <div className={styles.container_left_logo}>
          <NavLink to={"/"}>
            <span>{logo()}</span>
            <h1>
              Film<span>Makinası</span>
            </h1>
          </NavLink>
        </div>
        <div className={styles.container_left_nav}>
          {headerList.map((item: INavItem) => (
            <NavLink key={item.id} to={item.to}>
              {item.name}
            </NavLink>
          ))}
          <div className={styles.indicator}></div>
        </div>
      </div>
      <div className={styles.container_right}>
        <div className={styles.container_right_search}>
          <Formik
            initialValues={initialValues}
            className={styles.container_right_search_formik}
            onSubmit={(values: IValues) => {
              console.log({ values });
              setQuery(values.query);
            }}
          >
            <Form
            className={styles.container_right_search_formik_form}
            >
              <Field
                name="search"
                placeholder="Search for a Movie, Tv Shows, Person ..."
                type="text"
                className={styles.container_right_search_formik_form_input}
              />
              <button
                className={styles.container_right_search_formik_form_button}
                type="submit"
              >
                {search()}
              </button>
            </Form>
          </Formik>
        </div>
        <button className={styles.container_right_login}>Giriş</button>
      </div>
    </header>
  );
};

export default Header;
