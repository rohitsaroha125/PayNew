import Modal from "../../components/modal";
import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import styles from "./Home.module.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Tabs from "../../components/tabs/index";
import useHttpRequest from "../../hooks/useHttpRequest";
import { API_URL } from "../../utils/vars";
import Loader from "../../components/loader";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const tabsOptions = [
  {
    label: "Register",
    component: <RegisterUI />,
  },
  {
    label: "Login",
    component: <LoginUI />,
  },
];

const registerFormikFields = [
  {
    name: "firstName",
    placeholder: "Enter First Name",
  },
  {
    name: "lastName",
    placeholder: "Enter Last Name",
  },
  {
    name: "username",
    type: "email",
    placeholder: "Enter Email",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Enter Password",
  },
  {
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm Password",
  },
];

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleToggleLogin = () => {
    setShowLogin((prevState) => !prevState);
  };

  return (
    <>
      <Box className={styles.homeBg}>
        <Box>
          <Tabs tabsOptions={tabsOptions} />
        </Box>
      </Box>
    </>
  );
};

function RegisterUI() {
  const navigate = useNavigate();
  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    username: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    confirmPassword: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  const { loading, sendHttpRequest } = useHttpRequest(transformData);

  function transformData(data) {
    localStorage.setItem("user", JSON.stringify(data.data.user));
    localStorage.setItem("token", data.data.token);
    navigate("/dashboard");
  }

  function handleUserRegister(values) {
    const httpOptions = {
      method: "POST",
      url: `${API_URL}user/signup`,
      data: {
        ...values,
      },
    };

    sendHttpRequest(httpOptions);
  }

  return (
    <>
      {loading && <Loader />}
      <div>
        <h1 className="text-center">Register</h1>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            username: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            // console.log(values);
            handleUserRegister(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              {registerFormikFields.map((field, i) => {
                return (
                  <>
                    <Field
                      name={field.name}
                      key={i}
                      placeholder={field.placeholder}
                      type={field.type || "text"}
                      className={styles.formikField}
                    />
                    {errors[field.name] && touched[field.name] ? (
                      <div className={styles.errorDiv} key={i}>
                        {errors[field.name]}
                      </div>
                    ) : null}
                  </>
                );
              })}
              <Button
                className={styles.registerBtn}
                type="submit"
                variant="contained"
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

function LoginUI() {
  const { loading, sendHttpRequest } = useHttpRequest(transformData);
  const navigate = useNavigate();

  const SignupSchema = Yup.object().shape({
    username: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });

  function transformData(data) {
    localStorage.setItem("user", JSON.stringify(data.data.user));
    localStorage.setItem("token", data.data.token);
    navigate("/dashboard");
  }

  function handleUserLogin(values) {
    const httpOptions = {
      method: "POST",
      url: `${API_URL}user/signin`,
      data: {
        ...values,
      },
    };

    sendHttpRequest(httpOptions);
  }

  return (
    <div>
      <h1 className="text-center">Login</h1>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          // same shape as initial values
          handleUserLogin(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              className={styles.formikField}
              name="username"
              type="email"
              placeholder="Enter Email"
            />
            {errors.username && touched.username ? (
              <div className={styles.errorDiv}>{errors.username}</div>
            ) : null}
            <Field
              className={styles.formikField}
              name="password"
              type="password"
              placeholder="Enter Password"
            />
            {errors.password && touched.password ? (
              <div className={styles.errorDiv}>{errors.password}</div>
            ) : null}
            <Button
              className={styles.registerBtn}
              type="submit"
              variant="contained"
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Home;
