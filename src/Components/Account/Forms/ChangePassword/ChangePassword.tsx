import React, { useState } from "react";
import styles from "./changePassword.module.scss";
import * as Yup from "yup";
import {
  Formik,
  Form,
  Field,
} from "formik";
import { useChangePassword } from "../../../../Hooks/useChangePassword";
interface IValues {
  password: string;
  confirm:string;
}
const commentSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "The password is too short")
    .required("Password is required")
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter"),
  confirm: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], 'Must match "password" field value'),
});
const ChangePassword = () => {
  const initialValues: IValues = {
    password: "",
    confirm:""
  };
  const [password, setPassword] = useState<string>("")
  useChangePassword(password);
  return (
    <div className={styles.container}>
      <h1>Change Password</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={commentSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={(values: IValues) => {
          setPassword(values.password)
        }}
      >
        {({ errors, touched, isValid, dirty, isSubmitting }) => (
          <Form className={styles.container_form}>
            <div className={styles.container_form_password}>
              <Field
                className={styles.container_form_password_field}
                placeholder="Password"
                name="password"
                type="password"
              ></Field>
              {errors.password && touched.password ? (
                <div className={styles.container_form_password_error}>
                  {errors.password}
                </div>
              ) : null}
            </div>
            <div className={styles.container_form_password}>
              <Field
                className={styles.container_form_password_field}
                placeholder="Confirm Password"
                name="confirm"
                type="password"
              ></Field>
              {errors.confirm && touched.confirm ? (
                <div className={styles.container_form_password_error}>
                  {errors.confirm}
                </div>
              ) : null}
            </div>
            <div className={styles.container_form_button}>
              <button
                type="submit"
                disabled={!(isValid && dirty) || isSubmitting}
              >
                Change Password
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassword;
