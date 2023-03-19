import React, { useState } from "react";
import styles from "./changeUsername.module.scss";
import * as Yup from "yup";
import {
  Formik,
  Form,
  Field,
} from "formik";
import { useUpdatedDisplayName } from "../../../../Hooks/useChangeDisplayName";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { backArrow } from "../../../../Assets/svg/icons/backArrow";
interface IValues {
  username: string;
}
const commentSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "The username is too short")
    .max(8, "The username must be 8 characters long")
    .required("Username is required"),
});
const ChangeUsername = () => {
  const { t } = useTranslation();
  const initialValues: IValues = {
    username: "",
  };
  const [username, setUsername] = useState<string>("")
  useUpdatedDisplayName(username);
  return (
    <div className={styles.container}>
      <Link to={"/account"}>{backArrow()}</Link>
      <h1>{t('changeUsername')}</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={commentSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={(values: IValues) => {
          setUsername(values.username)
        }}
      >
        {({ errors, touched, isValid, dirty, isSubmitting }) => (
          <Form className={styles.container_form}>
            <div className={styles.container_form_username}>
              <Field
                className={styles.container_form_username_field}
                placeholder={t('usernamePlaceholder')}
                name="username"
                type="text"
              ></Field>
              {errors.username && touched.username ? (
                <div className={styles.container_form_username_error}>
                  {errors.username}
                </div>
              ) : null}
            </div>
            <div className={styles.container_form_button}>
              <button
                type="submit"
                disabled={!(isValid && dirty) || isSubmitting}
              >
                {t('changeUsername')}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangeUsername;
