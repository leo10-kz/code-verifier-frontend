import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { AxiosResponse } from 'axios';
import React, { useEffect, useState, Fragment } from 'react'
import { useNavigate } from 'react-router';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { getAllKatas } from '../services/katasService';
import codigo from '../assets/codigo-fuente.jpg';




const KatasPage = () => {

  let loggedIn = useSessionStorage('token')
  const navigate = useNavigate();
  let [katas, setKatas] = useState([]);
  let [totalPages, setTotalPages] = useState(1);
  let [currentPage, setCurrentpage] = useState(1);


  useEffect(() => {
    if (!loggedIn) {
      return navigate('/login');
    } else {
      getAllKatas(loggedIn, 2, 1).then((response: AxiosResponse) => {

        if (response.status === 200 && response.data.katas) {
          let { katas, totalPages, currentPage } = response.data;

          setKatas(katas);
          setTotalPages(totalPages);
          setCurrentpage(currentPage);
        } else {
          throw new Error(`Error obtaining katas: ${response}`);

        }


      }).catch((error) => console.error(error));
    }
  }, [loggedIn]);

  const navigateToKataDetail = (id: number) => {
    navigate(`/katas/${id}`)
  };

  return (
    <div>  
      {katas.length > 0 ?
        <List sx={{ width: '100%', maxWidth: 360, marginLeft: '20px', marginTop: '20px', cursor: 'pointer' }}>
          {katas.map((kata: any) => (
            <ListItem alignItems="center" key={kata._id}>
              <ListItemAvatar sx={{ margin: '10px' }}>
                <Avatar sx={{ height: '50px', width: '50px' }} alt="codigo-fuente" src={codigo} />
              </ListItemAvatar>
              <ListItemText
                onClick={() => navigateToKataDetail(kata._id)}
                primary={
                  <Typography
                    sx={{ display: 'inline' }}
                    component="h3"
                    variant="body2"
                    color="text.primary"
                    fontSize='20px'
                  >
                    {kata.name}
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
                      {kata.description}
                    </Typography>
                  </Fragment>
                }
              />
            </ListItem>
          ))}
        </List>
        :
        <div>
          <h4>Katas not found</h4>
        </div>
      }

    </div>
  )
}

export default KatasPage;
