import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { register } from '../../services/authService';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

const registerSchema = Yup.object().shape({
    name: Yup.string().max(10).required('Name is required'),
    email: Yup.string().email("Invalid email format").required("Email required"),
    password: Yup.string().required("Password required").matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
    confirmPassword: Yup.string().required('Please confirm your password').oneOf([Yup.ref('password'), null], "Passwords don't match."),
    age: Yup.number().required('Age is required')
});

const RegisterForm = () => {

    const navigate = useNavigate();

    let initialData = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        age: 0
    };

    return (
        <div>
            <h1>Register of User</h1>

            <Formik
                initialValues={initialData}
                validationSchema={registerSchema}
                onSubmit={async (values) => {
                 let response: AxiosResponse = await register(values.name, values.email, values.password, values.age);

                 if (response.status === 201) {
                    alert('usuario creado')
                    navigate('/login')
                 }else {
                    throw new Error("[ERROR]: Not created User");
                 }

                }}
            >
                {({ values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur, }) => (
                    <Form>
                        <label htmlFor="name">Name</label>
                        <Field
                            id='name'
                            type='text'
                            name='name'
                        />
                        {errors.name && touched.name && (
                            <ErrorMessage name="name" component="div"></ErrorMessage>
                        )}

                        <label htmlFor="email">Email</label>
                        <Field
                            id='email'
                            type='text'
                            name='email'
                        />
                        {errors.email && touched.email && (
                            <ErrorMessage name="email" component="div"></ErrorMessage>
                        )}

                        <label htmlFor="password">Password</label>
                        <Field
                            id='password'
                            type='text'
                            name='password'
                        />
                        {errors.password && touched.password && (
                            <ErrorMessage name="password" component="div"></ErrorMessage>
                        )}

                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <Field
                            id='confirmPassword'
                            type='text'
                            name='confirmPassword'
                        />
                        {errors.confirmPassword && touched.confirmPassword && (
                            <ErrorMessage name="confirmPassword" component="div"></ErrorMessage>
                        )}

                        <label htmlFor="age">Age</label>
                        <Field
                            id='age'
                            type='number'
                            name='age'
                            min='0'
                        />
                        {errors.age && touched.age && (
                            <ErrorMessage name="age" component="div"></ErrorMessage>
                        )}

                        <button type='submit'>Register</button>

                        {isSubmitting ? <p>Please wait... </p> : null}

                    </Form>
                )}

            </Formik>
        </div>
    )
}

export default RegisterForm;
