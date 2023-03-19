import React from 'react';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';




const MenuItems = ( {open} : {open:any} ) => (
    <React.Fragment>
        <ListItemButton onClick={()=>open('Katas')}>
            <ListItemIcon>
                <DashboardIcon/>
            </ListItemIcon>
            <ListItemText primary='Katas'/>
        </ListItemButton>

        <ListItemButton onClick={()=>open('Users')}>
            <ListItemIcon>
                <PeopleIcon/>
            </ListItemIcon>
            <ListItemText primary='Users'/>
        </ListItemButton>

        <ListItemButton onClick={()=>open('Ranking')}>
            <ListItemIcon>
                <BarChartIcon/>
            </ListItemIcon>
            <ListItemText primary='Ranking'/>
        </ListItemButton>
    </React.Fragment>
)

export default MenuItems