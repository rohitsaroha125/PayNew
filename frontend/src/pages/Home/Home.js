import Modal from "../../components/modal";
import { Box } from "@mui/material";
import React, { useState } from "react";
import styles from "./Home.module.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Tabs from "../../components/tabs/index";

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleToggleLogin = () => {
    setShowLogin((prevState) => !prevState);
  };

  return (
    <Box className={styles.homeBg}>
      <Box>
        <Tabs />
      </Box>
    </Box>
  );
};

function RegisterUI() {
  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  return (
    <div>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          // same shape as initial values
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="firstName" />
            {errors.firstName && touched.firstName ? (
              <div>{errors.firstName}</div>
            ) : null}
            <Field name="lastName" />
            {errors.lastName && touched.lastName ? (
              <div>{errors.lastName}</div>
            ) : null}
            <Field name="email" type="email" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Home;
