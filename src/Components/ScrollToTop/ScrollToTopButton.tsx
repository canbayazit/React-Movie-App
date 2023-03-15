import React, { useEffect, useState } from 'react'
import { scrollToTopButton } from '../../Assets/svg/icons/scrollToTopButton';
import styles from "./scrollTop.module.scss";

const ScrollToTopButton = () => {
    const [status, setStatus] = useState<boolean>(false)
    useEffect(() => {
        const onScroll = () => {
          const scrolledToBottom =
            window.innerHeight +250 <= window.scrollY + window.innerHeight
          if (scrolledToBottom) {
            setStatus(true);
          }else{
            setStatus(false);
          }
        };
        document.addEventListener("scroll", onScroll);
        return function () {
          document.removeEventListener("scroll", onScroll);
        };
      }, []);
    const handleClick=()=>{
        window.scrollTo({top:0, behavior: 'smooth'});
    }
  return (
    <div className={status ? `${styles.container} ${styles.active}` : styles.container} onClick={()=>handleClick()}>
        <span>{scrollToTopButton()}</span>
    </div>
  )
}

export default ScrollToTopButton