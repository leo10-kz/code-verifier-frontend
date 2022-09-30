import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useSessionStorage } from '../hooks/useSessionStorage';
import { getKataById } from '../services/katasService';
import Editor from '../components/editor/Editor';

const KatasDetailPage = () => {

  let { id } = useParams();
  let loggedIn = useSessionStorage('token');
  let navigate = useNavigate();
  let [showSolution, setShowSolution] = useState(false);
  let [kata, setKata] = useState({
    id:'',
    name:'',
    description:'',
    level: '',
    intents: 0,
    stars: 0,
    creator: '',
    solution: '<h1>NOT SOLUTION</h1>',
    participants: []
  });

  useEffect(() => {
    if (!loggedIn) {
      navigate('/login');
    } else{
      if (id) {
        getKataById(loggedIn, id).then((response: AxiosResponse) => {
          if (response.status === 200 && response.data) {
            setKata({
            id: response.data.id,   
            name:response.data.name,
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
  })

  return (
    <div>
      {kata ? 
        <div>
          <h1>Kata number {kata.id}</h1>
          <h3>Level: {kata.level}</h3>
          <h4>{kata.description}</h4>
          <br />
          <h5>Rating: { kata.stars }/5</h5>   

          <button onClick={() => setShowSolution(!showSolution)}>{!showSolution ? 'show Solution' : 'Hide Solution'}</button>
          {showSolution ? <Editor lenguage={'typescript'} children={kata.solution}></Editor> : null}

        </div>
      :
      <div>
        <h2>Loading Data...</h2>
      </div>
      }
    </div>
  )
}

export default KatasDetailPage