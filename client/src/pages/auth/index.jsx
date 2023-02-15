import Signin from '@/components/User/Login/SigninComp'
import Navbar from '@/components/User/Navbar/Navbar'
import { userDatafetch } from '@/config/userEndpoints'
import { useRouter } from 'next/router'
import React from 'react'

function index() {
  const router=useRouter();

  return (
    <>
    <Navbar/>
    <Signin/>
    </>
  )
}

export default index