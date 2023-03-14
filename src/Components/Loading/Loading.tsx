import React from "react";
import styles from "./loadingBar.module.scss";

const Loading = ({ children }: any) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.container_line}></div>
      </div>
    </>
  );
};

export default Loading;
