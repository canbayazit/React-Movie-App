import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from "formik";
import styles from "./register.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { lock } from "../../../Assets/svg/icons/lock";
import { person } from "../../../Assets/svg/icons/person";
import { mail } from "../../../Assets/svg/icons/mail";
import { signUp } from "../../../Service/authServices";

interface IValues {
  email: string;
  password: string;
  confirm: string;
  username: string;
}
const commentSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "The username is too short")
    .required("Username is required"),
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
  confirm: Yup.string().oneOf(
    [Yup.ref("password"), null],
    'Must match "password" field value'
  ),
});
const RegisterForm = () => {
  const initialValues: IValues = {
    email: "",
    password: "",
    confirm: "",
    username: "",
  };
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <h1>Sign Up</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={commentSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={async(values: IValues) => {
          console.log({ values });
          const user = await signUp(values.username,values.email,values.password);
          navigate("/login", { replace: true });
          if (user) {
            return console.log("Account created successfully")
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className={styles.container_form}>
            <div className={styles.container_form_username}>
              <Field
                className={styles.container_form_username_field}
                name="username"
                type="text"
              ></Field>
              {errors.username && touched.username ? (
                <div className={styles.container_form_username_error}>
                  {errors.username}
                </div>
              ) : null}
              {person(styles)}
              <h5>Username</h5>
            </div>
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
              {errors.password && touched.password ? (
                <div className={styles.container_form_password_error}>
                  {errors.password}
                </div>
              ) : null}
              {lock(styles)}
              <h5>Password</h5>
            </div>
            <div className={styles.container_form_password}>
              <Field
                className={styles.container_form_password_field}
                id="confirm"
                name="confirm"
                type="password"
              />
              {errors.confirm && touched.confirm ? (
                <div className={styles.container_form_password_error}>
                  {errors.confirm}
                </div>
              ) : null}
              {lock(styles)}
              <h5>Confirm Password</h5>
            </div>
            <div className={styles.container_form_button}>
              <button type="submit">
                {/* <span>{plane()}</span>  */}
                Sign-Up
              </button>
            </div>
            <div className={styles.container_form_link}>
              <Link to={"/login"}>Have an account ?</Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
