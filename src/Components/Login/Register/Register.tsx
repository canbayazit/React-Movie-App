import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  Formik,
  Form,
  Field,
} from "formik";
import styles from "./register.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { lock } from "../../../Assets/svg/icons/lock";
import { person } from "../../../Assets/svg/icons/person";
import { mail } from "../../../Assets/svg/icons/mail";
import { toast } from "react-toastify";
import { usePostRegisterServiceMutation } from "../../../Service/firebaseServices";
import Loading from "../../Loading/Loading";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "../../../Hooks/useMediaQuery";

interface IValues {
  email: string;
  password: string;
  confirm: string;
  username: string;
}

const RegisterForm = () => {
  const matchesMobile = useMediaQuery("(min-width: 601px)");
  const { t } = useTranslation();
  const initialValues: IValues = {
    email: "",
    password: "",
    confirm: "",
    username: "",
  };
  const commentSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, `${t('minUsername')}`)
      .max(8, `${t('maxUsername')}`)
      .required(`${t('usernameRequired')}`),
    email: Yup.string()
      .email(`${t('emailValidation')}`)
      .required(`${t('emailRequired')}`),
    password: Yup.string()
      .min(4, `${t('minPassword')}`)
      .required(`${t('passwordRequired')}`)
      .max(16, `${t('maxPassword')}`)
      .matches(/[0-9]/, `${t('matchesNumber')}`)
      .matches(/[a-z]/, `${t('matchesLowercase')}`)
      .matches(/[A-Z]/, `${t('matchesUppercase')}`),
    confirm: Yup.string()
      .required(`${t('confirmPasswordRequired')}`)
      .oneOf([Yup.ref("password"), null], `${t('matchesPassword')}`),
  });
  const navigate = useNavigate();
  const [postRegister, { isLoading }] = usePostRegisterServiceMutation();

  return (
    <>
      {isLoading && <Loading />}
      <div className={styles.container}>
        <h1>{t('registerTitle')}</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={commentSchema}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={async (values: IValues) => {
            await postRegister({
              username: values.username,
              email: values.email,
              password: values.password,
            })
              .unwrap()
              .then(() => {
                toast.success(t('registerSuccessful'), {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                });
                navigate("/login", { replace: true });
              })
              .catch((error) =>
                toast.error(`${error}`, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                })
              );
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
                <h5>{t('usernamePlaceholder')}</h5>
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
                {mail(styles,!matchesMobile ? 16 :20)}
                <h5>{t('emailPlaceholder')}</h5>
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
                {lock(styles,!matchesMobile ? 10 :20)}
                <h5>{t('passwordPlaceholder')}</h5>
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
                {lock(styles,!matchesMobile ? 10 :20)}
                <h5>{t('confirmPasswordPlaceholder')}</h5>
              </div>
              <div className={styles.container_form_button}>
                <button
                  type="submit"
                  disabled={!(isValid && dirty) || isSubmitting}
                >
                  {/* <span>{plane()}</span>  */}
                  {t('registerTitle')}
                </button>
              </div>
              <div className={styles.container_form_link}>
                <Link to={"/login"}>{t('haveAccountRegister')}</Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default RegisterForm;
