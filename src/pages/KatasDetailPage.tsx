import React from 'react'
import { useParams } from 'react-router'

const KatasDetailPage = () => {

  let { id } = useParams();

  return (
    <div>
      Kata number {id}
    </div>
  )
}

export default KatasDetailPage