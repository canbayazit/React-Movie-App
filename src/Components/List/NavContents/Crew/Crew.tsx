import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { imageSize } from "../../../../Store/constant";
import { useGetCreditServiceQuery } from "../../../../Service/movieServices";
import { ICrew } from "../../../../Types/credit";
import styles from "./crew.module.scss";
import { useTranslation } from "react-i18next";

const Crew = () => {
  const [group, setGroup] = useState<string[]>([]);
  const { t, i18n } = useTranslation();
  const { category, id } = useParams();
  const { data, isLoading } = useGetCreditServiceQuery({
    category: category!,
    id: id!,
    lang:i18n.language.replace("_","-")
  });
  const groupPerson = <K extends string | number | symbol, V>(
    array: V[],
    group: (person: V) => K
  ) => {
    let groupPerson = array.reduce((store, person) => {
      let key = group(person);
      if (!store[key]) {
        store[key] = [];
      }
      store[key].push(person);
      return store;
    }, {} as Record<K, V[]>);
    let dataArray = [];
    for (const key in groupPerson) {
      if (Object.prototype.hasOwnProperty.call(groupPerson, key)) {
        const value = groupPerson[key];
        dataArray.push({ group: key, value: value });
      }
    }
    return dataArray;
  };
  const getMoreItems = (data: ICrew[], groupItem: string) => {
    if (group) {
      return group.includes(groupItem) ? data : data.slice(0, 12);
    }
    return data.slice(0, 12);
  };
  const handleClick = (groupItem: string) => {
    if (group.includes(groupItem)) {
      const filterArray = group.filter(
        (item): item is string => item !== groupItem
      );
      setGroup(filterArray);
    } else {
      setGroup((prevNames) => [...prevNames, groupItem]);
    }
  };
  return (
    <div className={styles.container}>
      {isLoading ? (
        "loading"
      ) : (
        <div className={styles.container_crew}>
          {data?.crew
            .filter((item) => item.job === "Director")
            .map((item, i) => (
              <div key={i} className={styles.container_crew_director}>
                <div className={styles.container_crew_director_img}>
                  <h1>{t("director")}</h1>
                  <img src={`${imageSize}${item.profile_path}`} alt="" />
                </div>
                <div className={styles.container_crew_director_info}>
                  <h1>{item.name}</h1>
                  <span>{item.department}</span>
                </div>
              </div>
            ))}
          <div className={styles.container_crew_others}>
            {groupPerson(data?.crew!, (group) => group.department).map(
              (item, i) => (
                <div
                  key={`${item.group}_${i}`}
                  className={styles.container_crew_others_group}
                >
                  <h3>{item.group}</h3>
                  <ul>
                    {getMoreItems(item.value, item.group).map((person, i) => (
                      <li key={`${person.id}_${i}`}>{person.name}</li>
                    ))}
                  </ul>
                  {item.value.length > 12 ? (
                    <button onClick={() => handleClick(item.group)}>
                      {group.includes(item.group)
                        ? t("viewLess")
                        : t("viewMore")}
                    </button>
                  ) : null}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Crew;
