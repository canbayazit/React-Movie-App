import React, { useState } from "react";
import styles from "./changeMail.module.scss";
import * as Yup from "yup";
import {
  Formik,
  Form,
  Field,
} from "formik";
import { useChangeEmail } from "../../../../Hooks/useChangeEmail";
interface IValues {
  email: string;
}
const commentSchema = Yup.object().shape({
  email: Yup.string()
    .email("The email is invalid")
    .required("Mail is required"),
});
const ChangeMail = () => {
  const initialValues: IValues = {
    email: "",
  };
  const [email, setEmail] = useState<string>("")
  useChangeEmail(email);
  return (
    <div className={styles.container}>
      <h1>Change Mail</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={commentSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={ (values: IValues) => {
          setEmail(values.email);
        }}
      >
        {({ errors, touched, isValid, dirty, isSubmitting }) => (
          <Form className={styles.container_form}>
            <div className={styles.container_form_email}>
              <Field
                className={styles.container_form_email_field}
                placeholder="Email"
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
                Change Email
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangeMail;
