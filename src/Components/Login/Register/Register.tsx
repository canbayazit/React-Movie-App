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
import { toast } from "react-toastify";
import { usePostRegisterServiceMutation } from "../../../Service/firebaseServices";

interface IValues {
  email: string;
  password: string;
  confirm: string;
  username: string;
}
const commentSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "The username is too short")
    .max(8, "The username must be 8 characters long")
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
  confirm: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], 'Must match "password" field value'),
});
const RegisterForm = () => {
  const initialValues: IValues = {
    email: "",
    password: "",
    confirm: "",
    username: "",
  };
  const navigate = useNavigate();
  const [postRegister, { isLoading }] = usePostRegisterServiceMutation();

  return (
    <div className={styles.container}>
      <h1>Sign Up</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={commentSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={async (values: IValues) => {
          console.log({ values });
          await postRegister({
            username: values.username,
            email: values.email,
            password: values.password,
          })
          .unwrap()
          .then(()=> {
            toast.success("Account created successfully", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            navigate("/login", { replace: true })
          })
          .catch((error)=>toast.error(`${error.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }))
          
        }}
      >
        {({ errors, touched, isValid, dirty, isSubmitting }) => (
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
              <button
                type="submit"
                disabled={!(isValid && dirty) || isSubmitting}
              >
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
