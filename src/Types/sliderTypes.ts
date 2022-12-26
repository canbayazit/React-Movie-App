export interface ISetting {
        dots: boolean,
        arrows: boolean,
        infinite: boolean,
        adaptiveHeight: boolean,
        speed?: number,
        slidesToShow: number,
        slidesToScroll: number,
        initialSlide: number,
        autoplay: boolean,
        autoplaySpeed:number,
        cssEase: string,
        pauseOnHover: true,
        nextArrow: JSX.Element,
        prevArrow: JSX.Element,
        responsive: Responsive[]
}

interface Responsive {
            breakpoint: number,
            settings: Settings
              
}

interface Settings{
    dots: boolean,
    arrows: boolean,
    infinite: boolean,
    adaptiveHeight: boolean,
    speed: number,
    slidesToShow: number,
    slidesToScroll: number,
    initialSlide: number,
}