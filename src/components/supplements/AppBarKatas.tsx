import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar  from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';



   const AppBarKatas = ({children}: {children: React.ReactNode}) => {
    return(
      <Box sx={{ flexGrow: 1, marginTop: "1px" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           {children}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    )
  };

  export default AppBarKatas;