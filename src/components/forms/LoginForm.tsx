import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login } from "../../services/authService";
import { AxiosResponse } from "axios";

// Define Schema of validation yup
const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email format").required("Email required"),
  password: Yup.string().required("Password required"),
});

const LoginForm = () => {
  // We define the initial credentials
  const initialCredentials = {
    email: "",
    password: "",
  };

  return (
    <div>
      <h4>Login for user</h4>

      <Formik
        initialValues={initialCredentials}
        validationSchema={loginSchema}
        onSubmit={async (values) => {
          login(values.email, values.password).then((response: AxiosResponse) => {
            console.log(response.status);
            
            if (response.status === 201) {
              if (response.data.token) {
                  console.table(response.data);
                  sessionStorage.setItem('token', response.data.token);
                }else {
                  throw new Error("[ERROR]: Invalid token");
                }
              } else {
                throw new Error("Invalid credentials");
              }
          })
           .catch (error => console.error(`[LOGIN ERROR]: ${error}`)) 
            
        }}
      >
        {({
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
        }) => (
          <Form>
            <label htmlFor="email">Email</label>
            <Field
              id="email"
              type="text"
              name="email"
              placeholder="example@example.com"
            />
            {errors.email && touched.email && (
              <ErrorMessage name="email" component="div"></ErrorMessage>
            )}

            <label htmlFor="password">Password</label>
            <Field
              id="password"
              type="text"
              name="password"
              placeholder="xxxxxxxx"
            />
            {errors.password && touched.password && (
              <ErrorMessage name="password" component="div"></ErrorMessage>
            )}

            <button type="submit">Login</button>

            {isSubmitting ? <p>Checking credentials... </p> : null}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
