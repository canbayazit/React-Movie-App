import React, { useState } from "react";
import styles from "./changeMail.module.scss";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useChangeEmail } from "../../../../Hooks/useChangeEmail";
import { useTranslation } from "react-i18next";
import { backArrow } from "../../../../Assets/svg/icons/backArrow";
import { Link } from "react-router-dom";
interface IValues {
  email: string;
}
const commentSchema = Yup.object().shape({
  email: Yup.string()
    .email("The email is invalid")
    .required("Mail is required"),
});
const ChangeMail = () => {
  const { t } = useTranslation();  
  const initialValues: IValues = {
    email: "",
  };
  const [email, setEmail] = useState<string>("");
  useChangeEmail(email);
  return (
    <div className={styles.container}>
      <Link to={"/account"}>{backArrow()}</Link>
      <h1>{t('changeEmail')}</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={commentSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={(values: IValues) => {
          setEmail(values.email);
        }}
      >
        {({ errors, touched, isValid, dirty, isSubmitting }) => (
          <Form className={styles.container_form}>
            <div className={styles.container_form_email}>
              <Field
                className={styles.container_form_email_field}
                placeholder={t('emailPlaceholder')}
                name="email"
                type="email"
              ></Field>
              {errors.email && touched.email ? (
                <div className={styles.container_form_email_error}>
                  {errors.email}
                </div>
              ) : null}
            </div>
            <div className={styles.container_form_button}>
              <button
                type="submit"
                disabled={!(isValid && dirty) || isSubmitting}
              >
                {t('changeEmail')}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangeMail;
