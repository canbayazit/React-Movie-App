import React, { useState } from "react";
import styles from "./changeUsername.module.scss";
import * as Yup from "yup";
import {
  Formik,
  Form,
  Field,
} from "formik";
import { useUpdatedDisplayName } from "../../../../Hooks/useChangeDisplayName";
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
  const initialValues: IValues = {
    username: "",
  };
  const [username, setUsername] = useState<string>("")
  useUpdatedDisplayName(username);
  return (
    <div className={styles.container}>
      <h1>Change Username</h1>
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
                placeholder="Username"
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
                Change Username
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangeUsername;
