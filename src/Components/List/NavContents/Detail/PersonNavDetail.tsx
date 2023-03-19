import moment from "moment";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import i18n from "../../../../Assets/i18n";
import { useGetDetailServiceQuery } from "../../../../Service/movieServices";
import styles from "./personNavDetail.module.scss";

const PersonNavDetail = () => {
  const { category, id } = useParams();
  const { t } = useTranslation();
  const { data, isLoading } = useGetDetailServiceQuery({
    category: category!,
    id: id!,
    lang: i18n.language.replace("_", "-"),
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
              <p>{data?.biography || t("notFoundBio")}</p>
            </div>
            <div className={styles.container_content_right}>
              <div className={styles.container_content_right_info}>
                <h4>{t("department")}:</h4>
                <p>{data?.known_for_department}</p>
              </div>
              <div className={styles.container_content_right_info}>
                <h4>{t("age")}:</h4>
                <p>{moment().diff(data?.birthday, "years") || t("unknown")}</p>
              </div>
              <div className={styles.container_content_right_info}>
                <h4>{t("birthday")}:</h4>
                <p>{data?.birthday || t("unknown")}</p>
              </div>
              {data?.deathday ? (
                <div className={styles.container_content_right_info}>
                  <h4>{t("dayOfDeath")}:</h4>
                  <p>{data?.deathday || t("unknown")}</p>
                </div>
              ) : null}

              <div className={styles.container_content_right_info}>
                <h4>{t("placeOfBirth")}:</h4>
                <p>{data?.place_of_birth || t("unknown")}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PersonNavDetail;
