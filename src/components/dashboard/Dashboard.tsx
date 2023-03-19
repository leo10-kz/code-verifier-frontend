import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

// Css & Drawer
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';

// Nav Bar
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';

// Material List
import List from '@mui/material/List';

// Icons
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import Badge from '@mui/material/Badge';
import NotificationIcon from '@mui/icons-material/Notifications'

// Material Grid & Box
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';


// List for the Menu
import MenuItems from './MenuItems';
import EditorPanel from '../panels/EditorPanel';
import KatasPage from '../../pages/KatasPage';
import UserPanel from '../panels/UsersPanel';
import RankingPanel from '../panels/RankinPanel';

// Width for Drawer Menu
const drawerWidth: number = 240;

// Props for AppBar
interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => (
  {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    })
  }
));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overFlowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(7),
      // Breackpoint to media queries of CSS in diferent displays
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9)
      }
    })
  },
}))

const myTheme = createTheme();


const Dashboard = () => {

  const navigate = useNavigate()
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState('Code Verification Katas');

  const toogleDrawer = () => {
    setOpen(!open);
  }

  const sessionActive = (name: string) => {
    const userExisted = sessionStorage.getItem('token');

    if (userExisted === null) {
      navigate('login');
    } else {
      setSelected(name);

    }

  }

  return (
    <ThemeProvider theme={myTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <AppBar position='absolute' open={open}>
          <Toolbar sx={{ pr: '24px' }}>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='open drawer'
              onClick={toogleDrawer}
              sx={{ marginRight: '36px', ...(open && { display: 'none' }) }}
            >
              <MenuIcon />

            </IconButton>
            <Typography
              component='h1'
              variant='h6'
              color='inherit'
              noWrap
              sx={{
                flexGrow: 1
              }}
            >
              {selected}
            </Typography>

            <IconButton color='inherit'>
              <Badge badgeContent={10} color='secondary'>
                <NotificationIcon />
              </Badge>
            </IconButton>

            <IconButton color='inherit'>
              <LogoutIcon />
            </IconButton>

          </Toolbar>
        </AppBar>

        <Drawer variant='permanent' open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1]
            }}
          >

            <IconButton color='inherit' onClick={toogleDrawer}>
              <ChevronLeftIcon />
            </IconButton>

          </Toolbar>
          <Divider />

          <List component='nav'>
            {<MenuItems open={sessionActive} />}
          </List>
        </Drawer>

        <Box
          component='main'
          sx={{
            backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto'
          }}
        >
          <Toolbar />
          {
           selected === 'Code Verification Katas'?
           <EditorPanel/>:
           selected === 'Katas'?
           <KatasPage/>:
           selected === 'Users'?
           <UserPanel/>:<RankingPanel/>
          }     
        </Box>
      </Box>


    </ThemeProvider>
  )
}

export default Dashboard