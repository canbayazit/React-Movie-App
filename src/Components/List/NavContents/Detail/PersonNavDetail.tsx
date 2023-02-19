import moment from "moment";
import React from "react";
import { useParams } from "react-router";
import { useGetDetailServiceQuery } from "../../../../Store/services";
import styles from "./personNavDetail.module.scss";

const PersonNavDetail = () => {
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
          <h1>{data?.name}</h1>
          <div className={styles.container_content}>
            <div className={styles.container_content_left}>
              <p>{data?.biography}</p>
            </div>
            <div className={styles.container_content_right}>
              <div className={styles.container_content_right_info}>
                <h4>Department:</h4>
                <p>{data?.known_for_department}</p>
              </div>
              <div className={styles.container_content_right_info}>
                <h4>Age:</h4>
                <p>{moment().diff(data?.birthday, "years")}</p>
              </div>
              <div className={styles.container_content_right_info}>
                <h4>Birthday:</h4>
                <p>{data?.birthday}</p>
              </div>
              {data?.deathday ? (
                <div className={styles.container_content_right_info}>
                  <h4>Day of Death:</h4>
                  <p>{data?.birthday}</p>
                </div>
              ) : null}

              <div className={styles.container_content_right_info}>
                <h4>Place of Birth:</h4>
                <p>{data?.place_of_birth}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PersonNavDetail;
