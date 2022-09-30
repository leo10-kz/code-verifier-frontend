import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { getAllKatas } from '../services/katasService';

const KatasPage = () => {

  let loggedIn = useSessionStorage('token')
  const navigate = useNavigate();
  let [katas, setKatas] = useState([]);
  let [totalPages, setTotalPages] = useState(1);
  let [currentPage, setCurrentpage] = useState(1);

  
  useEffect(() => {
    if (!loggedIn) {
     return navigate('/login');
    }  else{
      getAllKatas(loggedIn, 2, 1).then((response: AxiosResponse) => {

        if (response.status === 200 && response.data.katas ) {
          let { katas, totalPages, currentPage } = response.data;
          
          setKatas(katas);
          setTotalPages(totalPages);
          setCurrentpage(currentPage);
        } else{
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
      <h1> Katas Page </h1>
      <div>
        {katas.length > 0 ? 
         <div>
           {katas.map((kata: any) => (
            <div key={kata._id}>
                <h3 onClick={() => navigateToKataDetail(kata._id)}>{kata.name}</h3>
                <h4>{kata.description}</h4>
                <h5>Creator nº: {kata.creator}</h5>
            </div>
           ))}
         </div>
         :
         <div>
           <h4>Katas not found</h4>
         </div>  
      }
      </div>
     
    </div>
  )
}

export default KatasPage;
