import { useEffect, useState } from "react";
import { shallowEqual } from "react-redux";
import Slider from "react-slick";
import { useAppDispatch, useAppSelector } from "../../Hooks/Hook";
import { setGenreId, setMovieId } from "../../Store/movieSlice";
import {
  useGetMoviesServiceQuery,
  useGetMovieVideoServiceQuery,
  useGetTvServiceQuery,
} from "../../Store/services";
import { Genre, IGenres } from "../../Types/genres";
import { IMovie } from "../../Types/movie";
import { ISetting } from "../../Types/sliderTypes";
import { ITv } from "../../Types/tv";
import { SampleNextArrow, SamplePrevArrow } from "../../Utils/Functions";
import Trailer from "../Video/Trailer";
import MovieCard from "./MovieCard/MovieCard";
import styles from "./movieSlide.module.scss";

const settings: ISetting = {
  className: "slider_slide",
  lazyLoad: "progressive",
  dots: false,
  arrows: true,
  infinite: true,
  adaptiveHeight: true,
  speed: 600,
  slidesToShow: 5,
  slidesToScroll: 3,
  initialSlide: 2,
  autoplay: false,
  autoplaySpeed: 6000,
  cssEase: "linear",
  pauseOnHover: false,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        dots: false,
        arrows: true,
        infinite: true,
        adaptiveHeight: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
      },
    },
    {
      breakpoint: 835,
      settings: {
        dots: false,
        arrows: true,
        infinite: true,
        adaptiveHeight: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 0,
      },
    },
    {
      breakpoint: 480,
      settings: {
        dots: false,
        arrows: true,
        infinite: true,
        adaptiveHeight: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
      },
    },
  ],
};
interface IData {
  buttonId: number;
  data: IMovie[] | ITv[];
  loading: boolean;
}
interface data {
  buttonId: number;
  data: string[],
  loading:boolean
}

interface IProps {
  genre: Genre,
  id: number,
  dataGenre:IGenres
  // movieId: number;
  // selectedGenreId?: number;
  // genreId: number;
}
//slide ilk 5 + 20 datadan geliyor 
//+ 20 rtk queryden ( query çekince component bir daha render oluyor ) 
// moviecard bu yüzden 45 kere çağırılmış oluyor
const MovieSlide = (props: IProps) => {
  const { genre, id,  dataGenre} = props;
  // const dispatch = useAppDispatch();
  // const { tvData} = useAppSelector((store) => store.movies);
  // const {genreId}  = useAppSelector((store) => store.movies,shallowEqual);

  //sadece ilgili slide renderlanır öbür türlü bütün slidelar renderlanıyor.
  // componenti 2 kere render ediyor belki useMemo kullanılabilir.
  // const genreId  = useAppSelector((store) => {
  //   if (store.movies.genreId===genre.id) {
  //     return store.movies.genreId
  //   }
  // } ,shallowEqual);
  // const movieId  = useAppSelector((store) =>{
  //   if (genreId===genre.id) {
  //     return store.movies.movieId
  //   }
  // } ,shallowEqual);

  // const { data, isLoading } = useGetMovieVideoServiceQuery(movieId!,{skip:!movieId});
// console.log(tvData)
// console.log(!movieId)
// console.log(data,"data");

  // componenti 2 kere render ediyor belki useMemo kullanılabilir.
const getMovie = useGetMoviesServiceQuery({ 
    category: "popularity",
    page: 1,
    id: genre.id,
  },{skip:id===2});
  // console.log(getMovie)
  const getTv = useGetTvServiceQuery({
    category: "popularity",
    page: 1,
    id: genre.id,
  },{skip:id===1}); // doğrumu ?
  // console.log(getTv)
  // if (getMovie.originalArgs) {
  
  // }
  const dataButton: IData[] = [
    {
      buttonId: 1,
      data: getMovie.data?.results!,
      loading: getMovie.isLoading!,
    },
    {
      buttonId: 2,
      data: getTv.data?.results!,
      loading: getTv.isLoading!,
    },
  ];

  // const data =["1","2","3","1","2","3"]  

  // const dataButton: data[] = [
  //   {
  //     buttonId: 1,
  //     data: data,
  //     loading:false
  //   },
   
  // ];
  useEffect(() => {
    // console.log("useEffect çalıştı");
    // console.log(getMovie);
  });
  console.log("useEffect çalıştı",genre.id);
  // console.log(getMovie);

  // console.log(genreId,"baş")
  // console.log("loading",!dataButton.find((item) => item.buttonId === id)?.loading)
  // const handleOnMouseOver = (genreId:number): void => {
  //   // const modal = document.querySelector(`#modal_${id}`);
  //   // modal?.querySelector('iframe')?.setAttribute('src',"https://www.youtube.com/embed/d9MyW72ELq0?autoplay=1");
  //   // dispatch(setSkip(false));
  //   dispatch(setMovieId(id));
  //   dispatch(setGenreId(genreId));
  //   // console.log(id,genreId)
  // };
  return (
    <>
      {!dataButton.find((item) => item.buttonId === id)?.loading ? (
        dataButton.find((item) => item.buttonId === id)?.data.length !== 0 ? (
          <div className={styles.container}>
            <div className={styles.container_button}>
              <h1>{genre.name} Movies</h1>
              <button>Daha Fazlasını Görüntüle</button>
            </div>
            <Slider {...settings}>
              {dataButton
                .find((item) => item.buttonId === id)
                ?.data?.map((movie, i) => {
                  const dataMovie=dataButton
                  .find((item) => item.buttonId === id)
                  ?.data
                  // const status =
                  //   genreId === genre.id
                  //     ? movieId === movie.id
                  //       ? true
                  //       : false
                  //     : false;
                    // const modal = status ? document.querySelector(`${movie.id}_${i}_${genreId}`) : null;
                      // console.log(i,"i")
                  return (
                    <div
                      className={styles.movie_card}
                      key={`${movie.id}_${i}_${genre.id}`}
                      id={`${movie.id}_${i}_${genre.id}`}
                      // onMouseEnter={() => handleOnMouseOver( movie.id,genreId)}
                      // onMouseEnter={() => handleOnMouseOver( genreId)}
                    >   
                       <MovieCard i={i} genre={genre} dataGenre={dataGenre} movie={movie} dataMovie={dataMovie!}/>

                        {/* {i===0 ? <Trailer  i={i} />
                        :<MovieCard genreId={genre.id} i={i}  /> }          */}
                      {/* {status ? (
                       isLoading?"loadig": <Trailer movieId={movie.id} i={i} data={data!}/>
                      ) : (
                       <MovieCard i={i} genre={genre} dataGenre={dataGenre} movie={movie} dataMovie={dataMovie!}/>
                      )}  */}
                    </div>
                  );
                })}
            </Slider>
          </div>
        ) : (
          <div>Veri Yok !</div>
        )
      ) : (
        <div>loading</div>
      )}
    </>
  );
};

export default MovieSlide;
