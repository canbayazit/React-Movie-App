import React, { useState } from "react";
import * as Yup from "yup";
import styles from "./comment.module.scss";
import user from "../../../../Assets/img/user.png";
import {
  Formik,
  Form,
  Field,
} from "formik";
import moment from "moment";
import { plane } from "../../../../Assets/svg/icons/paperPlane";
import { usePostCommentServiceMutation } from "../../../../Service/firebaseServices";
import { useParams } from "react-router";
import { useCommentListener } from "../../../../Hooks/useCommentListener";
import { useTranslation } from "react-i18next";
interface IValues {
  name: string;
  email: string;
  description: string;
  date: string;
}

const Comment = () => {
  const { t } = useTranslation();
  const [postComment] = usePostCommentServiceMutation();
  const {id}=useParams();
  const comments =useCommentListener(id);
  const commentSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, `${t('minName')}`)
      .required(`${t('nameRequired')}`),
    email: Yup.string()
      .email(`${t('emailValidation')}`)
      .required(`${t('emailRequired')}`),
    description: Yup.string()
      .min(6, `${t('minDescription')}`)
      .required(`${t('descriptionRequired')}`)
      .trim(),
  });
  const initialValues: IValues = {
    name: "",
    email: "",
    description: "",
    date: "",
  };
  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={commentSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={async (
          values: IValues       
        ) => {  
          let date = moment.utc().format();
          await postComment({
            id:id,
            name: values.name,
            email: values.email,
            description: values.description,
            date: date,
          });
        }}
      >
        {({ errors, touched }) => (
          <Form className={styles.container_form}>
            <div className={styles.container_form_text}>
              <Field
                className={styles.container_form_text_field}
                id="name"
                name="name"
                placeholder={t('namePlaceholder')}
              />
              <Field
                className={styles.container_form_text_field}
                id="email"
                name="email"
                placeholder={t('emailPlaceholder')}
                type="email"
              />
            </div>
            <div className={styles.container_form_description}>
              <Field
                className={styles.container_form_description_field}
                id="description"
                name="description"
                as="textarea"
                placeholder={t('commentPlaceholder')}
              />
            </div>
            <div className={styles.container_form_action}>
              <div className={styles.container_form_action_error}>
                {errors.name && touched.name ? (
                  <div className={styles.container_form_action_error_message}>
                    {errors.name}
                  </div>
                ) : null}

                {errors.email && touched.email ? (
                  <div className={styles.container_form_action_error_message}>
                    {errors.email}
                  </div>
                ) : null}

                {errors.description && touched.description ? (
                  <div className={styles.container_form_action_error_message}>
                    {errors.description}
                  </div>
                ) : null}
              </div>
              <div className={styles.container_form_action_button}>
                <button type="submit">
                  <span>{plane()}</span> {t('submit')}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      {comments.length > 0 ? (
        <div className={styles.container_user}>
          <div className={styles.container_user_header}>
            <i className="fa fa-start"></i>
            <h2>{t('allComments')}</h2>
          </div>
          <ul>
            {comments.map((item, i) => (
              <li>
                <div className={styles.container_user_img}>
                  <img src={user} alt="" />
                </div>
                <div className={styles.container_user_comment}>
                  <div className={styles.container_user_comment_info}>
                    <span>{item.name}</span>
                    <time dateTime={item.date}>
                      {moment
                        .utc(item.date)
                        .local()
                        .startOf("seconds")
                        .fromNow()}
                    </time>
                  </div>
                  <p>{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default Comment;
