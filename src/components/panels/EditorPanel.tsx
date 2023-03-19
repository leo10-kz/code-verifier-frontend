import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Kata } from '../../types/Kata.type'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NewEditor } from '../editor/NewEditor';
import { FileUploader } from '../uploader/FileUploader';
import { useFormik } from 'formik';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { createKata } from '../../services/katasService';
import { AxiosResponse } from 'axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Switch from '@mui/material/Switch';
import { cardHeaderClasses } from '@mui/material';

const theme = createTheme();

const EditorPanel = () => {

    const loggedIn = useSessionStorage('token');
    const [cases, setCases] = useState<boolean>(false)

    const { values, handleSubmit, handleChange, errors } = useFormik({
        initialValues: {
            name: "",
            description: "",
            level: "",
            intents: 0,
            stars: 0,
            creator: "",
            solution: "",
            participants: []
        },
        onSubmit: async (values) => {
            const kata: Kata = {
                name: values.name,
                description: values.description,
                level: values.level,
                intents: values.intents,
                stars: values.stars,
                creator: values.creator,
                solution: values.solution,
                participants: values.participants
            };

            const response: AxiosResponse = await createKata(loggedIn, kata);

            if (response.status === 200) {
                alert(response.data);
            } else {
                throw new Error("[ERROR]: Not created Kata");
            }


        },
    })
    console.log(values.level);

    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <Container maxWidth='lg' sx={{ mt: 4, mg: 4 , mb: 5}}>
                    <CssBaseline />
                    <Box
                        sx={{
                           
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Created your kata
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 6 }}>

                            <Grid container rowSpacing={1} sx={{ minWidth: 120, mb: 5 }} columnSpacing={{ xs: 3, sm: 2, md: 3 }} >
                                <Grid item xs={6}>
                                    <TextField
                                        id="filled-multiline-flexible"
                                        label="Name"
                                        color='primary'
                                        focused
                                        sx={{ width: '100%' }}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControl fullWidth focused>
                                        <InputLabel id="demo-simple-select-label">Level</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={values.level}
                                            name='level'
                                            onChange={handleChange}
                                            label="Level"
                                        >
                                            <MenuItem value={'BASIC'}>Basic</MenuItem>
                                            <MenuItem value={'MEDIUM'}>Medium</MenuItem>
                                            <MenuItem value={'HIGH'}>High</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <NewEditor children={" "} />
                            <Switch
                                onChange={() => setCases(!cases)}
                                name="FileUpload"
                                color="primary"
                            />
                            <Grid item xs={6}  sx={{ width: '50vw' }}>
                                {
                                    cases ? (<FileUploader />):
                                    (
                                        <TextField
                                            id="filled-multiline-flexible"
                                            label="Descriptions"
                                            multiline={true}
                                            rows={8}
                                            variant="filled"
                                            sx={{ width: '50vw', mt: 5 }}
                                            color='primary'
                                            focused
                                        />

                                    )
                                    
                                }
                            </Grid>
                        </Box>
                    </Box>
                </Container>

               {/*  <Container maxWidth='lg' sx={{ mt: 4, mg: 4 }}>
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 355
                        }}>
                            <FileUploader />
                        </Paper>


                    </Grid>
                </Container> */}
            </ThemeProvider>
        </React.Fragment>
    )
}

export default EditorPanel