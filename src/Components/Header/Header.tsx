import { useEffect, useState } from "react";
import {
  createSearchParams,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
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
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Hooks/Hook";
import { shallowEqual } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { logOutHandle } from "../../Store/authSlice";
import { toast } from "react-toastify";
interface INavItem {
  id: number;
  name: string;
  to: string;
}
const headerList: INavItem[] = [
  { id: 1, name: "HOME", to: "/" },
  { id: 2, name: "WATCHLIST", to: "/whistlist" },
  { id: 3, name: "FAVORITES", to: "/favoritelist" },
];
interface IValues {
  query: string;
}
const Header = () => {
  const [isScrolling, setScrolling] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const initialValues: IValues = {
    query: "",
  };
  const user = useAppSelector((store) => store.auth.user, shallowEqual);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY >= 80 ? setScrolling(true) : setScrolling(false);
    });
  }, []);
  const handlelogOut=async()=>{
      const auth= getAuth();
      await signOut(auth).then(
        ()=>{
          dispatch(logOutHandle())
          toast.success("Successfully logged out", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      ).catch((error)=>{
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
  }
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
          {headerList.find((i) => i.to === location.pathname) && (
            <div className={styles.indicator}></div>
          )}
        </div>
      </div>
      <div className={styles.container_right}>
        <div className={styles.container_right_search}>
          <Formik
            initialValues={initialValues}
            className={styles.container_right_search_formik}
            onSubmit={(values: IValues) => {
              console.log(values);
              const params = { query: values.query };
              // to navigate we have to set handlesubmit
              navigate({
                pathname: "/search/movie",
                search: `?${createSearchParams(params)}`,
              });
            }}
          >
            {(props) => (
              <Form className={styles.container_right_search_formik_form}>
                <Field
                  name="query"
                  placeholder="Search for a Movie, Tv Shows, Person ..."
                  type="text"
                  value={props.values.query}
                  className={styles.container_right_search_formik_form_input}
                />
                <button
                  className={styles.container_right_search_formik_form_button}
                  type="submit"
                  onClick={() => props.handleSubmit()}
                >
                  <Link to={"/search"}>{search()}</Link>
                </button>
              </Form>
            )}
          </Formik>
        </div>
        {user.email ? (
          <div className={styles.container_right_profile}>
            <ul>
              <li>
                <h2>{user.displayName}</h2>

                <img src={user.photoURL} alt="" />
              </li>
              <li><Link to={"/account"}>Account</Link></li>
              <li onClick={()=>handlelogOut()}>Log Out</li>
            </ul>
          </div>
        ) : (
          <Link to={"/login"} className={styles.container_right_login}>
            Giriş
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
