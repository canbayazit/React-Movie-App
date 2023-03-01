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

function App() {
  useEffect(() => {
    console.log("render");
  });

  return (
    <>
      <Header />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path=":category/:id" element={<DetailPage />} />
        <Route path=":category" element={<FilterPage />} />
        <Route element={<LoginPage />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="whistlist" element={<WhistlistFavoritesPage />} />
        <Route path="favorites" element={<WhistlistFavoritesPage />} />
        <Route path="search/:category" element={<SearchPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
