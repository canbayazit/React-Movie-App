import { useEffect, useState } from "react";
import {
  createSearchParams,
  NavLink,
  useNavigate,
} from "react-router-dom";
import { logo } from "../../Assets/svg/icons/logo";
import styles from "./header.module.scss";
import { Formik, Form, Field } from "formik";
import { search } from "../../Assets/svg/icons/search";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Hooks/Hook";
import { shallowEqual } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { logOutHandle } from "../../Store/authSlice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
interface INavItem {
  id: number;
  name: string;
  to: string;
}
interface IValues {
  query: string;
}
const Header = () => {
  const [isScrolling, setScrolling] = useState(false);
  const [query, setQuery] = useState<string>("");
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const initialValues: IValues = {
    query: "",
  };
  const user = useAppSelector((store) => store.auth.user, shallowEqual);
  const headerList: INavItem[] = [
    { id: 1, name: t("home"), to: "/" },
    { id: 2, name: t("watchList"), to: "/whistlist" },
    { id: 3, name: t("favoriteList"), to: "/favoritelist" },
  ];
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY >= 80 ? setScrolling(true) : setScrolling(false);
    });
  }, []);
  const handlelogOut = async () => {
    const auth = getAuth();
    await signOut(auth)
      .then(() => {
        dispatch(logOutHandle());
        toast.success(t('logOutSuccessful'), {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((error) => {
        toast.error(`${error.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
    navigate("/login");
  };
  const changeLang = (lang:string) => {
    if (lang==="en_US") {
      i18n.changeLanguage("tr_TR");
      localStorage.setItem("language", "tr_TR");
    }else{
      i18n.changeLanguage("en_US");
      localStorage.setItem("language", "en_US");
    }    
  };
 useEffect(() => {
   if (query) {
    const params = { query: query };
      navigate({
      pathname: "/search/movie",
      search: `?${createSearchParams(params)}`,
    });
   }
 }, [query])
 
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
        </div>
      </div>
      <div className={styles.container_right}>
        <div className={styles.container_right_search}>
          <Formik
            initialValues={initialValues}
            className={styles.container_right_search_formik}
            onSubmit={(values: IValues,{resetForm}:any) => {
              // to navigate we have to set handlesubmit           
              setQuery(values.query)
              if (!query) {
                const params = { query: query };
              navigate({
              pathname: "/search/movie",
              search: `?${createSearchParams(params)}`,
              });
              }              
              resetForm();
            }}
          >
            {({submitForm}) => (
              <Form className={styles.container_right_search_formik_form}>
                <Field
                  name="query"
                  placeholder={t("searchPlaceholder")}
                  type="text"
                  className={styles.container_right_search_formik_form_input}
                />
                <button
                  className={styles.container_right_search_formik_form_button}
                  type="submit"
                  onClick={submitForm}
                >
                  {search()}
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <div className={styles.container_right_lang}>
          <button onClick={() => changeLang(i18n.language)}>
            {i18n.language.substring(0,2).toUpperCase()}
          </button>
        </div>
        {user.email ? (
          <div className={styles.container_right_profile}>
            <ul>
              <li>
                <h2>{user.displayName}</h2>

                <img src={user.photoURL} alt="" />
              </li>
              <li>
                <Link to={"/account"}>{t("account")}</Link>
              </li>
              <li onClick={() => handlelogOut()}>{t("logOut")}</li>
            </ul>
          </div>
        ) : (
          <Link to={"/login"} className={styles.container_right_login}>
            {t("loginTitle")}
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
