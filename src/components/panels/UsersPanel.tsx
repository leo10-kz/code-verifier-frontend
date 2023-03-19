import React, { useEffect, useState, Fragment } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { getAllUsers } from '../../services/userService';
import userImg from '../../assets/usermap.png'





const UserPanel = () => {

    const navigate = useNavigate();
    const loggedIn = useSessionStorage('token');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function usersData() {
            if (!loggedIn) {
                return navigate('/login')
            } else {
                try {
                    const dataUser = await getAllUsers(100);
                    setUsers(dataUser.data.users);

                } catch (error) {
                    console.error(error);
                }
            }
        }
        usersData();
    }, [loggedIn])
    console.log('users', users)

    return (
        <div>
            {users.length > 0 ?
                <List sx={{ width: '100%', maxWidth: 360, marginLeft: '20px', marginTop: '20px', cursor: 'pointer' }}>
                    {users.map((user: any) => (
                        <ListItem alignItems="center" key={user._id}>
                            <ListItemAvatar sx={{ margin: '10px' }}>
                                <Avatar sx={{ height: '50px', width: '50px' }} alt="codigo-fuente" src={userImg} />
                            </ListItemAvatar>
                            <ListItemText
                                //onClick={() => navigateToKataDetail(kata._id)}
                                primary={
                                    <Typography
                                        sx={{ display: 'flex' }}
                                        component="h3"
                                        variant="body2"
                                        color="text.primary"
                                        fontSize='20px'
                                    >
                                        {user.name}
                                    </Typography>


                                }
                                secondary={
                                    <Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text-secondary"
                                            fontSize='15px'
                                        >
                                            {user.email}
                                            
                                        </Typography>
                                    </Fragment>
                                    
                                }
                                
                            />
                        </ListItem>
                    ))}
                </List>
                :
                <div>Users not found</div>
            }
        </div>
    )
}

export default UserPanel