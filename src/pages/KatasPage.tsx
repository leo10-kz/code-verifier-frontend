import React from 'react'
import { useNavigate } from 'react-router';

const KatasPage = () => {

  const navigate = useNavigate();

  const navigateToKataDetail = (id: number) => {
    navigate(`/katas/${id}`)
  };

  return (
    <div>
      <h1> Katas Page </h1>

      <ul>
        <li onClick={() => navigateToKataDetail(1)}> First Kata </li>
        <li onClick={() => navigateToKataDetail(2)}> Second Kata </li>
      </ul>
    </div>
  )
}

export default KatasPage;
