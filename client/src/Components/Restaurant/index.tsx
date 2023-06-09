import axios from 'axios'
import React from 'react'
import { Axios } from '../../axios/config'

function index() {
  const handleClick = (e: any) => {
    const formdata = new FormData()
    formdata.append('image', e.target.files[0])
    formdata.append('name', 'test')
    console.log(formdata.get('image'))
    Axios.post(
      '/restaurant/new',
      { formdata },
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
  }

  return (
    <div>
      <input type="file" onChange={handleClick} />
    </div>
  )
}

export default index
