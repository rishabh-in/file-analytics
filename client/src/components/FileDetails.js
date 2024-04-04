import React from 'react'
import { useParams } from 'react-router-dom'

const FileDetails = () => {
  const {id} = useParams();
  console.log(id);
  return (
    <div>FileDetails</div>
  )
}

export default FileDetails