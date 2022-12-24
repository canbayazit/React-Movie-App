import "./App.css";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home/Home";
import Footer from "./Components/Footer/Footer";
// import {
//   useGetMovieDetailServiceQuery,
//   useGetMoviesServiceQuery,
//   useGetPersonMoviesServiceQuery,
//   useGetPersonServiceQuery,
//   useGetUpcomingMoviesServiceQuery,
// } from "./Store/services";
import { Route, Routes } from "react-router";
import { useEffect } from "react";

function App() {
  // const movieList = useGetMoviesServiceQuery({
  //   category: "popularity",
  //   page: 1,
  // });
  // const movieDetail = useGetMovieDetailServiceQuery(76600);
  // const person = useGetPersonServiceQuery(65731);
  // // const personMovie = useGetPersonMoviesServiceQuery(65731);
  // // const upcomingMovieList = useGetUpcomingMoviesServiceQuery(1);
  // console.log(movieList.data);
  // console.log(movieDetail.data);
  // console.log(person.data);
  // // console.log(personMovie.data);
  // // console.log(upcomingMovieList.data);

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
