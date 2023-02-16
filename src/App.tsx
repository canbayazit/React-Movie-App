import "./App.scss";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home/Home";
import Footer from "./Components/Footer/Footer";
import { Route, Routes } from "react-router";
import { useEffect } from "react";
import DetailPage from "./Pages/DetailPage/DetailPage";
import FilterPage from "./Pages/FilterPage/FilterPage";

function App() {
  useEffect(() => {
    console.log("render");
  });

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:category/:id" element={<DetailPage />}></Route>
        <Route path="/:category" element={<FilterPage />}></Route>
        <Route path="/login" element={<Home />}></Route>
        <Route path="/favourites" element={<Home />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
