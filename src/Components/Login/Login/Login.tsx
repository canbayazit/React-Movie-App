import React, { useEffect } from "react";
import * as Yup from "yup";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from "formik";
import styles from "./login.module.scss";
import { Link } from "react-router-dom";
import { person } from "../../../Assets/svg/icons/person";
import { lock } from "../../../Assets/svg/icons/lock";
import { mail } from "../../../Assets/svg/icons/mail";
interface IValues {
  email: string;
  password: string;
}
const commentSchema = Yup.object().shape({
  email: Yup.string()
    .email("The email is invalid")
    .required("Mail is required"),
  password: Yup.string()
    .min(2, "The password is too short")
    .required("Password is required")
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter"),
});
const Login = () => {
  const initialValues: IValues = {
    email: "",
    password: "",
  };
console.log(styles)
  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={commentSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={(values: IValues) => {
          console.log({ values });
        }}
      >
        {({ errors,touched }) => (
          <Form className={styles.container_form}>
            <div className={styles.container_form_mail}>
              <Field
                className={styles.container_form_mail_field}
                name="email"
                type="email"
              ></Field>
              {errors.email && touched.email ? (
                <div className={styles.container_form_mail_error}>
                  {errors.email}
                </div>
              ) : null}
              {mail(styles)}
              <h5>Email</h5>
            </div>
            <div className={styles.container_form_password}>
              <Field
                className={styles.container_form_password_field}
                id="password"
                name="password"
                type="password"
              />
              {errors.password && touched.password? (
                <div className={styles.container_form_password_error}>
                  {errors.password}
                </div>
              ) : null}
              {lock(styles)}
              <h5>Password</h5>
            </div>
            <div className={styles.container_form_button}>
              <button type="submit">
                {/* <span>{plane()}</span>  */}
                LOGIN
              </button>
            </div>
            <div className={styles.container_form_link}>
              <Link to={"/register"}>Don't have an account ?</Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;