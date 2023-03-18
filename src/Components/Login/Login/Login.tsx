import React, { useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import styles from "./login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { lock } from "../../../Assets/svg/icons/lock";
import { mail } from "../../../Assets/svg/icons/mail";
import { loginHandle } from "../../../Store/authSlice";
import { useAppDispatch } from "../../../Hooks/Hook";
import { toast } from "react-toastify";
import { usePostLoginServiceMutation } from "../../../Service/firebaseServices";
import Loading from "../../Loading/Loading";
import { useTranslation } from "react-i18next";
interface IValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { t } = useTranslation();
  const initialValues: IValues = {
    email: "",
    password: "",
  };
  const commentSchema = Yup.object().shape({
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
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [postLogin, { isLoading }] = usePostLoginServiceMutation();

  return (
    <>
      {isLoading && <Loading />}
      <div className={styles.container}>
        <h1>{t('loginTitle')}</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={commentSchema}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={async (values: IValues) => {
            console.log({ values });
            await postLogin({
              email: values.email,
              password: values.password,
            })
              .unwrap()
              .then((userObject) => {
                const user = JSON.parse(userObject);
                dispatch(
                  loginHandle({
                    email: user.email,
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                  })
                );
                toast.success(t('loginSuccessful'), {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                });
                navigate("/");
              })
              .catch((error) => {
                toast.error(`${error}`, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                });
              });
          }}
        >
          {({ errors, touched, isValid, dirty, isSubmitting }) => (
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
                {lock(styles)}
                <h5>{t('passwordPlaceholder')}</h5>
              </div>
              <div className={styles.container_form_button}>
                <button
                  type="submit"
                  disabled={!(isValid && dirty) || isSubmitting}
                >
                  {/* dirty: It is true when we write to any element of the form. */}
                  {/* isSubmitting: period of submit */}
                  {t('loginTitle')}
                </button>
              </div>
              <div className={styles.container_form_link}>
                <Link to={"/register"}>{t('haveAccountLogin')}</Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default LoginForm;
