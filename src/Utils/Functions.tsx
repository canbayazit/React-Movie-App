import { arrowButtonLeft, arrowButtonRight } from "../Assets/svg/svg";

export function SamplePrevArrow(props: any) {
    const { onClick } = props;
    return (
      <div
        style={{
          display: "flex",
          position: "absolute",
          left: "10px",
          top: "0",
          bottom:"0",
          alignItems:"center",
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
 export function SampleNextArrow(props: any) {
    const { onClick } = props;
    return (
      <div
        style={{
          display: "flex",
          position: "absolute",
          right: "10px",
          top: "0",
          bottom:"0",
          alignItems:"center",
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