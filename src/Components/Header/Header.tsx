import { useEffect, useState } from "react";
import {
  createSearchParams,
  NavLink,
  useLocation,
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
import { useMediaQuery } from "../../Hooks/useMediaQuery";
import { home } from "../../Assets/svg/icons/home";
import { addWhistList } from "../../Assets/svg/icons/whistList";
import { deleteFavorite } from "../../Assets/svg/icons/deleteFavorite";
import { hamburgerMenu } from "../../Assets/svg/icons/hamburgerMenu";
import { closeButton } from "../../Assets/svg/icons/closeButton";
import Menu from "../Menu/Menu";
interface INavItem {
  id: number;
  name: string;
  to: string;
  icon: (size: number, color: string) => JSX.Element;
  size: number;
  colorActive: string;
  colorPassive: string;
}
interface IValues {
  query: string;
}
const Header = () => {
  const [isScrolling, setScrolling] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const matchesNav = useMediaQuery("(min-width: 1441px)");
  const matchesTablet = useMediaQuery("(min-width: 1025px)");
  const matchesMobile = useMediaQuery("(min-width: 601px)");
  const initialValues: IValues = {
    query: "",
  };
  const user = useAppSelector((store) => store.auth.user, shallowEqual);
  const headerList: INavItem[] = [
    {
      id: 1,
      name: t("home"),
      to: "/",
      icon: home,
      size: 25,
      colorActive: "#62b4f5",
      colorPassive: "#fff",
    },
    {
      id: 2,
      name: t("watchList"),
      to: "/whistlist",
      icon: addWhistList,
      size: 30,
      colorActive: "#62b4f5",
      colorPassive: "#fff",
    },
    {
      id: 3,
      name: t("favoriteList"),
      to: "/favoritelist",
      icon: deleteFavorite,
      size: 23,
      colorActive: "#62b4f5",
      colorPassive: "#fff",
    },
  ];

  //25,fff,23
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY >= 80 ? setScrolling(true) : setScrolling(false);
    });
  }, []);
  useEffect(() => {
    setOpenMenu(false);
  }, [location.pathname]);
  const handlelogOut = async () => {
    const auth = getAuth();
    await signOut(auth)
      .then(() => {
        dispatch(logOutHandle());
        toast.success(t("logOutSuccessful"), {
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
  const changeLang = (lang: string) => {
    if (lang === "en_US") {
      i18n.changeLanguage("tr_TR");
      localStorage.setItem("language", "tr_TR");
    } else {
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
  }, [query]);
  const handleOpenSearch = () => {
    setOpenSearch(!openSearch);
    setOpenMenu(false);
  };
  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
    setOpenSearch(false);
  };
  return (
    <header
      className={
        !matchesTablet
          ? `${styles.header} ${
              isScrolling
                ? styles.active
                : openSearch || openMenu
                ? styles.active
                : ""
            }`
          : isScrolling
          ? `${styles.header} ${styles.active}`
          : styles.header
      }
    >
      <div className={styles.container}>
        {!matchesMobile && (
          <div
            className={
              openMenu
                ? `${styles.container_hamburger} ${styles.active}`
                : styles.container_hamburger
            }
          >
            <span onClick={() => handleOpenMenu()}>
              {openMenu ? closeButton(40, 2) : hamburgerMenu}
            </span>
          </div>
        )}
        <div className={styles.container_left}>
          <div className={styles.container_left_logo}>
            <NavLink to={"/"}>
              {matchesMobile ? (
                <span>{logo(!matchesMobile ? 30 : 40)}</span>
              ) : null}
              <h1>
                Film<span>Makinası</span>
              </h1>
            </NavLink>
          </div>
          {matchesMobile && (
            <div className={styles.container_left_nav}>
              {headerList.map((item: INavItem) => (
                <NavLink key={item.id} to={item.to}>
                  {({ isActive }) =>
                    matchesNav
                      ? i18n.language === "tr_TR"
                        ? item.name.toLocaleUpperCase("tr-TR")
                        : item.name.toUpperCase()
                      : item.icon(
                          item.size,
                          isActive ? item.colorActive : item.colorPassive
                        )
                  }
                </NavLink>
              ))}
            </div>
          )}
        </div>
        <div className={styles.container_right}>
          {!matchesTablet ? (
            <div
              className={
                openSearch
                  ? `${styles.container_right_searchIcon} ${styles.active}`
                  : styles.container_right_searchIcon
              }
            >
              <button onClick={() => handleOpenSearch()}>
                {openSearch
                  ? closeButton(!matchesMobile ? 35 : 50, 1.5)
                  : search(!matchesMobile ? 27 : 35)}
              </button>
            </div>
          ) : null}
          <div
            className={
              !matchesTablet
                ? openSearch
                  ? `${styles.container_right_search} ${styles.active}`
                  : styles.container_right_search
                : styles.container_right_search
            }
          >
            <Formik
              initialValues={initialValues}
              className={styles.container_right_search_formik}
              onSubmit={(values: IValues, { resetForm }: any) => {
                // to navigate we have to set handlesubmit
                setQuery(values.query);
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
              {({ submitForm }) => (
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
                    {search(25)}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
          <div
            className={
              matchesMobile
                ? styles.container_right_lang
                : `${styles.container_right_lang} ${styles.active}`
            }
          >
            <button onClick={() => changeLang(i18n.language)}>
              {i18n.language.substring(0, 2).toUpperCase()}
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
        {!matchesMobile ? openMenu ? <Menu /> : null : null}
      </div>
    </header>
  );
};

export default Header;
