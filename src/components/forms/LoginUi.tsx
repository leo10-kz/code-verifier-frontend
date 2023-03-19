import React, { useState } from 'react';
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
import { login } from '../../services/authService';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router';
import * as Yup from 'yup'
import Modal from '../modal/Modal';

const theme = createTheme();



export default function SignIn() {
  
  const navigate = useNavigate();
  const [modal, setModal] = useState(false)


  const { values, handleSubmit, handleChange, errors } = useFormik({
    initialValues:{
      email:"",
      password: ""
    },
    onSubmit: async (values) => {
       login(values.email, values.password).then(async (response: AxiosResponse) => {
            console.log(response.status);

            if (response.status === 201) {
              console.log("people",response.data);
              if (response.data.token) {
                await sessionStorage.setItem('token', response.data.token);
                navigate('/')
              } else {
                setModal(!modal);
                //throw new Error("[ERROR]: Invalid token");
              }
            } else {
              throw new Error("Invalid credentials");
            }
          })
            .catch(error => console.error(`[LOGIN ERROR]: ${error}`))
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email format").required("Email required"),
      password: Yup.string().required("Password required"),
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={values.email}
              onChange={handleChange}
              error={ errors.email }
              helperText={errors?.email && errors.email}
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
              value={values.password}
              onChange={handleChange}
              error ={errors.password }
              helperText={errors?.password && errors.password}
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
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      {modal && <Modal open={modal} close={setModal}/>}
    </ThemeProvider>
  );
}