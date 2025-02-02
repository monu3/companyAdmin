import React from 'react'
import AddClient from '../components/AddClient'
import ClientDisplay from '../components/ClientDisplay'

const clientPage = () => {
  return (
    <div>
      <AddClient/>
      <ClientDisplay/>
    </div>
  )
}

export default clientPage