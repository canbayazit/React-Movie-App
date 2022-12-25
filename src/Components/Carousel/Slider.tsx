import { arrowButtonLeft, arrowButtonRight } from '../../Assets/svg/svg';
import Slider from "react-slick";
import { ISetting } from '../../Types/sliderTypes';

const SliderMovie = () => {
    function SamplePrevArrow(props:any) {
        const { onClick } = props;
        return (
          <div
            style={{
              display: "flex",
              position: "absolute",
              left: "0",
              top: "0",
              marginLeft: 0,
              opacity: 0.7,
            }}
            onClick={onClick}
          >
            {arrowButtonLeft()}
          </div>
        );
      }
      function SampleNextArrow(props:any) {
        const { onClick } = props;
        return (
          <div
            style={{
              display: "flex",
              position: "absolute",
              right: "0",
              top: "0",
              marginRight: 0,
              justifyContent: "flex-end",
              opacity: 0.7,
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
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
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
    <div>
        <Slider {...settings}>
        <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
        </Slider>
    </div>
  )
}

export default SliderMovie