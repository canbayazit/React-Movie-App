export interface Setting {
        dots: boolean,
        arrows: boolean,
        infinite: boolean,
        adaptiveHeight: boolean,
        speed: number,
        slidesToShow: number,
        slidesToScroll: number,
        initialSlide: number,
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