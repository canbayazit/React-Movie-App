import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import styles from "./comment.module.scss";
import user from "../../../Assets/img/user.png";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from "formik";
import moment from "moment";
import { plane } from "../../../Assets/svg/icons/paperPlane";
interface IValues {
  name: string;
  email: string;
  description: string;
  date: string;
}
const commentSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "The password is too short")
    .required("Name is required"),
  email: Yup.string()
    .email("The email is invalid")
    .required("Mail is required"),
  description: Yup.string()
    .min(6, "The description is too short")
    .required("Description is required")
    .trim(),
});

const Comment = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  console.log(new Date(), "today");
  console.log(today.getDate(), "day");
  console.log(dd, "day");
  console.log(mm, "month");
  console.log(yyyy + mm + dd, "year");

  // console.log(moment("20220503", "YYYYMMDD").fromNow(),"years ") // 11 years ago,"date")
  const [comment, setComment] = useState<IValues[]>([]);
  const initialValues: IValues = {
    name: "",
    email: "",
    description: "",
    date: "",
  };
  return (
    <div className={styles.container}>
      {/* <Formik
        initialValues={{
          name: "",
          email: "",
          description: "",
        }}
        // validationSchema={commentSchema}
        onSubmit={(values: IValues, actions) => {
          console.log({ values, actions });
          alert(JSON.stringify(values));
          // actions.setSubmitting(false);
        }}
      >
        {({
          errors,
          touched,
          handleSubmit,
          values,
          handleChange,
          dirty,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <input
                // name="text1"
                value={values.name}
                type="text"
                placeholder="Can"
                onChange={handleChange}
              />
              <input
                name="email"
                value={values.email}
                type="email"
                placeholder="Can@mail.com"
                onChange={handleChange}
              />
            </div>
            <div>
              <textarea
                name="textarea"
                placeholder="Add a comment..."
                onChange={handleChange}
                cols={100}
                rows={5}
              ></textarea>
            </div>
            <div>
              <div>
                {errors.name && touched.name ? (
                  <div>{errors.name}</div>
                ) : null}
              </div>
              <div>
                <button type="submit">Submit</button>
              </div>
            </div>
          </form>
        )}
      </Formik> */}
      <Formik
        initialValues={initialValues}
        validationSchema={commentSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(
          values: IValues
          // actions,
          // validate : FormikHelpers<IValues>
          // { setSubmitting }: FormikHelpers<IValues>
        ) => {
          // setTimeout(() => {
          //   alert(JSON.stringify(values, null, 2));
          //   setSubmitting(false);
          // }, 500);
          console.log({ values });
          let today = new Date();
          let dd = String(today.getDate()).padStart(2, "0");
          let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
          let yyyy = today.getFullYear();
          let date = `${yyyy}-${mm}-${dd}`;
          console.log(moment("20230203", "YYYYMMDD").fromNow(), "dateeee");

          setComment([
            ...comment,
            {
              name: values.name,
              email: values.email,
              description: values.description,
              date: `${yyyy}-${mm}-${dd}`,
            },
          ]);
        }}
      >
        {({ errors, touched }) => (
          <Form className={styles.container_form}>
            <div className={styles.container_form_text}>
              <Field
                className={styles.container_form_text_field}
                id="name"
                name="name"
                placeholder="Name"
              />
              <Field
                className={styles.container_form_text_field}
                id="email"
                name="email"
                placeholder="name@mail.com"
                type="email"
              />
            </div>
            <div className={styles.container_form_description}>
              <Field
                className={styles.container_form_description_field}
                id="description"
                name="description"
                as="textarea"
                placeholder="Add a comment..."
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
                  <span>{plane()}</span> Submit
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      {comment.length > 0 ? (
        <div className={styles.container_user}>
          <div className={styles.container_user_header}>
            <i className="fa fa-start"></i>
            <h2>All Comments</h2>
          </div>
          <ul>
            {comment.map((item, i) => (
              <li>
                <div className={styles.container_user_img}>
                  <img src={user} alt="" />
                </div>
                <div className={styles.container_user_comment}>
                  <div className={styles.container_user_comment_info}>
                    <span>{item.name}</span>
                    <time dateTime={item.date}>
                      {moment(
                        `${item.date.split("-").join("")}`,
                        "YYYYMMDD"
                      ).fromNow()}
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
