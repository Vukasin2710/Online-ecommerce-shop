import React from 'react'
import { useParams } from 'react-router-dom'

function SingleProductPage() {

  let params = useParams();
  console.log(params);
  

  return (
    <div>SingleProductPage</div>
  )
}

export default SingleProductPage
