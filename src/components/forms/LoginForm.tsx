import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login } from "../../services/authService";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


// Define Schema of validation yup
const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email format").required("Email required"),
  password: Yup.string().required("Password required"),
});

const theme = createTheme()

const LoginForm = () => {

  let navigate = useNavigate()
  // We define the initial credentials
  const initialCredentials = {
    email: "",
    password: "",
  };

  return (
    <div>


      <Formik
        initialValues={initialCredentials}
        validationSchema={loginSchema}
        onSubmit={async (values) => {
          login(values.email, values.password).then(async (response: AxiosResponse) => {
            console.log(response.status);

            if (response.status === 201) {
              if (response.data.token) {
                await sessionStorage.setItem('token', response.data.token);
                navigate('/katas')
              } else {
                throw new Error("[ERROR]: Invalid token");
              }
            } else {
              throw new Error("Invalid credentials");
            }
          })
            .catch(error => console.error(`[LOGIN ERROR]: ${error}`))

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
          <ThemeProvider theme={theme}>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                  >
                  <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>
                   <Box component="form" noValidate sx={{ mt: 1 }}>
                  
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign In
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <Link href="#" variant="body2">
                          Forgot password?
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link href="#" variant="body2">
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Container>
            </ThemeProvider>
            /*  <label htmlFor="email">Email</label>
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

            {isSubmitting ? <p>Checking credentials... </p> : null} */
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
