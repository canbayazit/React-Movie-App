import "./App.scss";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home/Home";
import Footer from "./Components/Footer/Footer";
import { Route, Routes } from "react-router";
import { useEffect } from "react";

function App() {
  useEffect(() => {
 console.log("render")
  })
  

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}>
          {/* <Route path="movies/categories/:id" element={<Home />}></Route> */}
        </Route>

        {/* <Route path="/movies/:id" element={<Home />}></Route>
        <Route path="/login" element={<Home />}></Route>
        <Route path="/register" element={<Home />}></Route>
        <Route path="/favourites" element={<Home />}></Route>
        <Route path="/person" element={<Home />}></Route> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
