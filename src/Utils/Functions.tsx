import { arrowButtonLeft, arrowButtonLeftUpcoming, arrowButtonRight, arrowButtonRightUpcoming } from "../Assets/svg/svg";

export function SamplePrevArrow(props: any) {
    const { onClick } = props;   
    return (
      <div
        style={{
          display: "flex",
          position: "absolute",
          left: "0",
          top: "0",
          bottom:"0",
          alignItems:"center",
          justifyContent:"center",
          marginLeft: 0,
          opacity: 0.9,
          width:"50px",
          height:"185px",
          zIndex:998,
          cursor:"Pointer",
          margin: "10px 5px",  
          backgroundColor:"rgba(0, 0, 0, 0.2)",

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
          right: "0",
          top: "0",
          bottom:"0",
          alignItems:"center",
          justifyContent:"center",
          marginRight: 0,
          opacity: 0.9,
          zIndex:998,
          width:"50px",
          height:"185px",
          backgroundColor:"rgba(0, 0, 0, 0.3)",
          cursor:"Pointer",
          margin: "10px 0", 
        }}
        onClick={onClick}
      >
        {arrowButtonRight()}
      </div>
    );
  }
  export function SamplePrevArrowUpcoming(props: any) {
    const { onClick } = props;
    return (
      <div
        style={{
          display: "flex",
          position: "absolute",
          left: "0",
          top: "0",
          bottom:"0",
          alignItems:"center",
          justifyContent:"center",
          marginRight: 0,
          opacity: 0.9,
          zIndex:998,
          width:"50px",
          height:"100%",
          cursor:"Pointer",

        }}
        onClick={onClick}
      >
        {arrowButtonLeftUpcoming()}
      </div>
    );
  }
  export function SampleNextArrowUpcoming(props: any) {
    const { onClick } = props;
    return (
      <div
        style={{
          display: "flex",
          position: "absolute",
          right: "0",
          top: "0",
          bottom:"0",
          alignItems:"center",
          justifyContent:"center",
          marginRight: 0,
          opacity: 0.9,
          zIndex:998,
          width:"50px",
          height:"100%",
          cursor:"Pointer",
        }}
        onClick={onClick}
      >
        {arrowButtonRightUpcoming()}
      </div>
    );
  }