import React, { Suspense } from "react";
import "./App.scss";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home/Home";
import Footer from "./Components/Footer/Footer";
import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import { useUserListListener } from "./Hooks/useUserListListener";
import PrivateRoute from "./Components/PrivateRoute";
import Loading from "./Components/Loading/Loading";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";

const DetailPage = React.lazy(() => import("./Pages/DetailPage/DetailPage"));
const FilterPage = React.lazy(() => import("./Pages/FilterPage/FilterPage"));
const WhistlistFavoritesPage = React.lazy(
  () => import("./Pages/WhistlistFavoritesPage/WhistlistFavoritesPage")
);
const Whistlist = React.lazy(() => import("./Components/WhistList/Whistlist"));
const FavoriteList = React.lazy(
  () => import("./Components/FavoriteList/FavoriteList")
);
const LoginPage = React.lazy(() => import("./Pages/LoginPage/LoginPage"));
const Login = React.lazy(() => import("./Components/Login/Login/Login"));
const Register = React.lazy(
  () => import("./Components/Login/Register/Register")
);
const SearchPage = React.lazy(() => import("./Pages/Search/SearchPage"));
const ChangeMail = React.lazy(
  () => import("./Components/Account/Forms/ChangeMail/ChangeMail")
);
const ChangePassword = React.lazy(
  () => import("./Components/Account/Forms/ChangePassword/ChangePassword")
);
const ChangeUsername = React.lazy(
  () => import("./Components/Account/Forms/ChangeUsername/ChangeUsername")
);
const AccountPage = React.lazy(() => import("./Pages/AccountPage/AccountPage"));
const Account = React.lazy(() => import("./Components/Account/Account"));

function App() {
  useUserListListener();
  return (
    <>
      <Header />
      <Routes>        
        <Route path="/" element={<Home />} />
        <Route
          element={
            <PrivateRoute>
              <Suspense fallback={<Loading />}>
                <LoginPage />
              </Suspense>
            </PrivateRoute>
          }
        >
          <Route
            path="login"
            element={
              <Suspense fallback={<Loading />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="register"
            element={
              <Suspense fallback={<Loading />}>
                <Register />
              </Suspense>
            }
          />
        </Route>

        <Route
          element={
            <Suspense fallback={<Loading />}>
              <WhistlistFavoritesPage />
            </Suspense>
          }
        >
          <Route
            path="whistlist"
            element={
              <Suspense fallback={<Loading />}>
                <Whistlist />
              </Suspense>
            }
          />
          <Route
            path="favoritelist"
            element={
              <Suspense fallback={<Loading />}>
                <FavoriteList />
              </Suspense>
            }
          />
        </Route>

        <Route
          path="account"
          element={
            <Suspense fallback={<Loading />}>
              <AccountPage />
            </Suspense>
          }
        >
          <Route
            index={true}
            element={
              <Suspense fallback={<Loading />}>
                <Account />
              </Suspense>
            }
          />
          <Route
            path="email"
            element={
              <Suspense fallback={<Loading />}>
                <ChangeMail />
              </Suspense>
            }
          />
          <Route
            path="password"
            element={
              <Suspense fallback={<Loading />}>
                <ChangePassword />
              </Suspense>
            }
          />
          <Route
            path="username"
            element={
              <Suspense fallback={<Loading />}>
                <ChangeUsername />
              </Suspense>
            }
          />
        </Route>

        <Route
          path="detail/:category/:id"
          element={
            <Suspense fallback={<Loading />}>
              <DetailPage />
            </Suspense>
          }
        />
        <Route
          path="filter/:category"
          element={
            <Suspense fallback={<Loading />}>
              <FilterPage />
            </Suspense>
          }
        />
        <Route
          path="search/:category"
          element={
            <Suspense fallback={<Loading />}>
              <SearchPage />
            </Suspense>
          }
        /> 
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer
        style={{ width: "max-content" }}
        progressClassName="toastProgress"
        bodyClassName="toastBody"
      />
      <Footer />
    </>
  );
}

export default App;
