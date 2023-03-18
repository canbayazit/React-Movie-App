import React from "react";
import { useTranslation } from "react-i18next";
import { github } from "../../Assets/svg/icons/github";
import { linkedin } from "../../Assets/svg/icons/linkedin";
import styles from "./footer.module.scss";
const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className={styles.container}>
      <h2>{t('contact')}</h2>
      <ul className={styles.buttons}>
        <li>
          <a
            href="https://github.com/canbayazit"
            target="_blank"
            rel="noreferrer"
          >
            {github}
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/canbayazit/"
            target="_blank"
            rel="noreferrer"
          >
            {linkedin}
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
