import { AxiosResponse } from 'axios';
import React, {useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useSessionStorage } from '../hooks/useSessionStorage';
import { getKataById } from '../services/katasService';
import AppBarKatas from '../components/supplements/AppBarKatas';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import { NewEditor } from '../components/editor/NewEditor';
import CardContent from '@mui/material/CardContent/CardContent';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
};

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const KatasDetailPage = () => {

  let { id } = useParams();
  let loggedIn = useSessionStorage('token');
  let navigate = useNavigate();
  let [kata, setKata] = useState({
    id: '',
    name: '',
    description: '',
    level: '',
    intents: 0,
    stars: 0,
    creator: '',
    solution: `var array1=[], array2=[]

    function ejemplo1(){
    
      var num=document.getElementById("select1").value;
      for(i=0;i<num;i++)
      {
        array1.push(parseInt(Math.random()*100));
      }
      document.getElementById("ejemplo1").value=array1;
    }`,
    participants: []
  });



  useEffect(() => {

    if (!loggedIn) {
      navigate('/login');
    } else {
      if (id) {
        getKataById(loggedIn, id).then((response: AxiosResponse) => {
          if (response.status === 200 && response.data) {
            setKata({
              id: response.data._id,
              name: response.data.name,
              description: response.data.description,
              level: response.data.level,
              intents: response.data.intents,
              stars: response.data.stars,
              creator: response.data.creator,
              solution: response.data.solution,
              participants: response.data.participants
            })


          }

        })
          .catch((error) => console.error(`[Error in Kata Detail]: ${error}`))
      }
    }
  }, []);



  return (
    <Box>
      <AppBarKatas
        children={
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {kata.creator}
          </Typography>
        }
      />
      {kata ?
        <Card sx={{ maxWidth: "100vw", height: "50vh", alignItems: "center" }}>
          <Box sx={{ display: "flex" }}>
            <Box >
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    {kata.creator.split("")[0]}
                  </Avatar>
                }
              />
            </Box>
            <Box sx={{width:"100vw", paddingRight:10}}>
              <CardContent >
                <Typography component="p" variant="h5">
                  {kata.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="p">
                  Dificult: {kata.level}
                </Typography>
              </CardContent>
            </Box>
          </Box>

          <NewEditor children={kata.solution} />
          <CardContent sx={{ fontSize: "17px", margin: 10 }}>
            <Typography variant="body2" color="text.primary" component="p" sx={{ fontSize: "17px" }}>
              {kata.description}
            </Typography>
          </CardContent>

        </Card>

        :
        <div>
          <h2>Loading Data...</h2>
        </div>
      }
    </Box>
  )
}

export default KatasDetailPage