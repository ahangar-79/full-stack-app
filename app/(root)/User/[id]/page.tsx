import { auth } from '@/auth'
import React from 'react'

const page = () => {
  const id = (await params).id
  const session = await auth()
  
    return (
    <div>page</div>
  )
}

export default page 