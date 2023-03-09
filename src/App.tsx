import "./App.scss";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home/Home";
import Footer from "./Components/Footer/Footer";
import { Route, Routes } from "react-router";
import { useEffect } from "react";
import DetailPage from "./Pages/DetailPage/DetailPage";
import FilterPage from "./Pages/FilterPage/FilterPage";
import WhistlistFavoritesPage from "./Components/WhistList/WhistlistFavorites";
import SearchPage from "./Pages/Search/SearchPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import Login from "./Components/Login/Login/Login";
import Register from "./Components/Login/Register/Register";
import { ToastContainer } from "react-toastify";
import { useUserListListener } from "./Hooks/useUserListListener";
import AccountPage from "./Pages/AccountPage/AccountPage";
import ChangeMail from "./Components/Account/Forms/ChangeMail/ChangeMail";
import Account from "./Components/Account/Account";
import ChangeUsername from "./Components/Account/Forms/ChangeUsername/ChangeUsername";
import ChangePassword from "./Components/Account/Forms/ChangePassword/ChangePassword";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  useUserListListener();
  return (
    <>
      <Header />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path=":category/:id" element={<DetailPage />} />
        <Route path=":category" element={<FilterPage />} />
        <Route 
          element={
            <PrivateRoute>
              <LoginPage />
            </PrivateRoute>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="whistlist" element={<WhistlistFavoritesPage />} />
        <Route path="favorites" element={<WhistlistFavoritesPage />} />
        <Route path="search/:category" element={<SearchPage />} />
        <Route path="account" element={<AccountPage />}>
          <Route index={true} element={<Account />} />
          <Route path="email" element={<ChangeMail />} />
          <Route path="password" element={<ChangePassword />} />
          <Route path="username" element={<ChangeUsername />} />
        </Route>
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
