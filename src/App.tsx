import "./App.css";
import Header from "./Components/Header/Header";
import { Routes } from "react-router";
import { Route } from "react-router/dist/lib/components";
import Home from "./Pages/Home/Home";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/movies" element={<Home />}>
          <Route path="movies/categories/:id" element={<Home />}></Route>
        </Route>
        <Route path="/movies/:id" element={<Home />}></Route>
        <Route path="/login" element={<Home />}></Route>
        <Route path="/register" element={<Home />}></Route>
        <Route path="/favourites" element={<Home />}></Route>
        <Route path="/person" element={<Home />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
