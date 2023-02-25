import React from "react";
import { useParams } from "react-router";
import { imageSize } from "../../../Store/constant";
import { useGetDetailServiceQuery } from "../../../Store/services";
import notFoundImage from "../../../Assets/img/personUser.png";
import styles from "./personDetail.module.scss";

const PersonDetail = () => {
  const { category, id } = useParams();
  const { data, isLoading } = useGetDetailServiceQuery({
    category: category!,
    id: id!,
  });
  return (
    <>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div className={styles.container}>
          <div className={styles.container_img}>
            <img src={data?.profile_path
                ? `${imageSize}${data?.profile_path}`
                : notFoundImage} alt="" />
          </div>
          <section className={styles.container_detail}>
            <h1>{data?.name}</h1>
            <div className={styles.container_detail_bio}>
              <h3>Biography</h3>
              <p>{data?.biography}</p>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default PersonDetail;
