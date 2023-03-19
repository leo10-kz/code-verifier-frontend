import * as React from 'react';
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
import { useFormik } from 'formik';
import { register } from '../../services/authService';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router';
import * as Yup from 'yup'


const theme = createTheme();

export default function SignUp() {

    const navigate = useNavigate();

  const { values, isSubmitting, setFieldValue, handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      name: '',
      email: '',
      age: 0,
      password: '',
      confirmPassword: ''
    },
    onSubmit: async (values) => {
        let response: AxiosResponse = await register(values.name, values.email, values.password, values.age);

        if (response.status === 201) {
           alert('usuario creado')
           navigate('/login')
        }else {
           throw new Error("[ERROR]: Not created User");
        }
    },
    validationSchema:Yup.object().shape({
      name: Yup.string().max(10).required('Name is required'),
      email: Yup.string().email("Invalid email format").required("Email required"),
      password: Yup.string().required("Password required").matches(
          /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
          "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      ),
      confirmPassword: Yup.string().required('Please confirm your password').oneOf([Yup.ref('password'), null], "Passwords don't match."),
      age: Yup.number().required('Age is required')
  })
  })

  return (
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={values.name}
                  onChange={handleChange}
                  error={ errors.name }
                  helperText={ errors?.name && errors.name }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="age"
                  label="Age"
                  name="age"
                  autoComplete="0"
                  type="number"
                  value={values.age}
                  onChange={handleChange}
                  error={ errors.age }
                  helperText={ errors?.age && errors.age }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange}
                  error={errors.email}
                  helperText={errors?.email && errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  error={ errors.password }
                  helperText={ errors?.password && errors.password }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  error={ errors.confirmPassword }
                  helperText={ errors?.name && errors.confirmPassword }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}