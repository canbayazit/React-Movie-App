import Slider from "react-slick";
import { useState } from "react";
import styles from "./upcoming.module.scss";
import { arrowButtonLeft, arrowButtonRight } from "../../../Assets/svg/svg";
import { ISetting } from "../../../Types/sliderTypes";
import { useGetUpcomingMoviesServiceQuery } from "../../../Store/services";
import SlideItem from "./SlideItem/SlideItem";
import More from "../../More/More";

const SliderMovie = () => {
  const [page, setpage] = useState<number>(1);
  const upcomingMovieList = useGetUpcomingMoviesServiceQuery(page);
  console.log(upcomingMovieList);
  function SamplePrevArrow(props: any) {
    const { onClick } = props;
    return (
      <div
        style={{
          display: "flex",
          position: "absolute",
          left: "0",
          top: "50%",
          marginLeft: 0,
          opacity: 0.7,
          zIndex: 999,
          cursor:"Pointer",
        }}
        onClick={onClick}
      >
        {arrowButtonLeft()}
      </div>
    );
  }
  function SampleNextArrow(props: any) {
    const { onClick } = props;
    return (
      <div
        style={{
          display: "flex",
          position: "absolute",
          right: "0",
          top: "50%",
          marginRight: 0,
          justifyContent: "flex-end",
          opacity: 0.7,
          cursor:"Pointer",

        }}
        onClick={onClick}
      >
        {arrowButtonRight()}
      </div>
    );
  }
  const settings: ISetting = {
    dots: false,
    arrows: true,
    infinite: true,
    adaptiveHeight: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 6000,
    cssEase: "linear",
    pauseOnHover: true,
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
  return (
    <div className={styles.container}>
      <div className={styles.container_heading}>
        <h1>Vizyona Girecek Filmler</h1>
      </div>
      <div className={styles.container_slider}>
        <Slider {...settings} className={styles.container_slider_movie}>
          {upcomingMovieList.data?.results.map((movie, index) => (
            <SlideItem item={movie} index={index} />
          ))}
        </Slider>
      </div>
      <More />
      <div>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis
        iusto culpa quibusdam quaerat sunt, unde harum quam quos reiciendis
        atque quas dolores distinctio corrupti, aliquam quod accusamus autem
        consectetur expedita. Nisi, distinctio quam fugiat animi sapiente ad
        eligendi eveniet, qui eaque dignissimos incidunt delectus quaerat velit,
        reprehenderit eos esse quisquam. Officia nam ipsa, expedita ut quaerat
        quasi nostrum animi id! Officiis expedita quia commodi accusamus, a
        fugit perferendis amet ad quaerat deleniti ut unde. Corrupti quia ex
        molestias repellendus distinctio aut error quod. Ipsa ea ducimus vel,
        maiores iusto est? Quo hic repellendus aut veritatis ullam totam laborum
        cumque modi recusandae dignissimos. Officiis sit doloribus, enim
        pariatur rerum reiciendis nihil beatae, eum unde dolorum laudantium.
        Quasi sint explicabo neque modi! Nam veniam libero neque nesciunt
        deleniti consequatur excepturi unde, earum amet non rem praesentium at!
        Ab soluta qui nobis cupiditate odit voluptatibus illo possimus,
        repudiandae perspiciatis ipsam, expedita cum placeat! Explicabo nam,
        provident sunt non eveniet totam nemo culpa dolores optio. Voluptates,
        dicta? Culpa sit distinctio cum magnam est laboriosam vero modi, quasi
        facilis! Tempora sapiente culpa blanditiis est aliquam? Vero, ad!
        Consectetur, debitis error quod, quam sunt deleniti quasi maiores ab
        architecto quis animi reiciendis rem adipisci perferendis earum in porro
        minus. Consequatur ratione amet, commodi id inventore iste! Eaque quas
        placeat doloribus facilis necessitatibus, ad hic delectus repudiandae
        fugiat consequatur veniam neque eveniet saepe illo quasi ipsam voluptas,
        quia unde libero temporibus vitae laborum deleniti ducimus quae? Nobis.
        Earum nesciunt mollitia, ratione exercitationem atque aperiam rem
        consectetur pariatur rerum modi accusamus nemo nostrum! Corporis dicta
        quidem quaerat commodi consequatur id exercitationem odio corrupti nobis
        odit mollitia, iure vitae? Pariatur, a perferendis voluptatem obcaecati
        expedita velit, adipisci dolorem architecto delectus, asperiores fugiat
        amet nulla libero? Sint, sit obcaecati, illo dignissimos id debitis modi
        saepe iste fugiat cumque sed. Et.

        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, sint earum. Ratione alias eos voluptate, aperiam illo repellat? Doloremque optio totam iusto doloribus itaque tenetur explicabo unde sequi inventore corporis.
        Eligendi impedit saepe facilis nisi officia, vero magnam nobis nulla doloribus. Aut pariatur et soluta aspernatur, mollitia eos, dolores a corrupti, omnis laudantium fugiat debitis non commodi odio quis obcaecati?
        Quae odio amet commodi eos culpa hic ducimus, beatae molestiae aspernatur modi placeat nisi fuga veniam illum sint accusantium natus laborum voluptas deserunt ipsum laboriosam illo magni. Voluptas, dolore molestias.
        Tenetur reprehenderit minima praesentium aperiam animi aliquam neque accusamus nesciunt repellendus ipsum ex repudiandae odit nobis sequi totam molestias exercitationem ipsa, deleniti fugit quidem doloribus? Ratione nulla iste pariatur vitae.
        Aliquid, in. Consequuntur omnis ipsam optio voluptas temporibus suscipit aspernatur quaerat rem aperiam enim est inventore possimus alias, vitae earum. Voluptates facere dolores doloremque sunt repudiandae, adipisci quia delectus molestiae.
      </div>
    </div>
  );
};

export default SliderMovie;
