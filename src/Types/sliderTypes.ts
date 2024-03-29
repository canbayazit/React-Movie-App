import { LazyLoadTypes } from "react-slick";

export interface ISetting {
        className?:string,
        centerMode?:boolean,
        centerPadding?:string,
        variableWidth?:boolean,
        lazyLoad?: LazyLoadTypes | undefined;
        dots?: boolean,
        arrows?: boolean,
        infinite?: boolean,
        adaptiveHeight?: boolean,
        speed?: number,
        slidesToShow?: number,
        slidesToScroll?: number,
        initialSlide?: number,
        autoplay?: boolean,
        autoplaySpeed?:number,
        cssEase?: string,
        pauseOnHover?: boolean,
        nextArrow?: JSX.Element,
        prevArrow?: JSX.Element,
        responsive?: Responsive[]
        afterChange?(currentSlide: number): void;
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