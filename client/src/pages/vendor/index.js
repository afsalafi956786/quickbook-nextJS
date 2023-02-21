import React from 'react'
import { useEffect } from 'react'
import { vendorDatafetch } from '@/config/venderEndpoints'
import Router, { useRouter } from 'next/router'

function dashboard() {
    const router=useRouter();

  useEffect(()=>{
    async function invoke(){
        if(localStorage.getItem('vendortoken')){
            const data=await vendorDatafetch ({'vendortoken':localStorage.getItem('vendortoken')})
            console.log(data)
            if(data.status =='failed'){
                router.push('/vendor/login')
            }else if(data.auth){
                router.push('/vendor')
            }
        
        }else{
            router.push('/vendor/login')
        }

    }
    invoke()

  },[])

  return (
       <>
       <div>
            <h1 className='bg-red-600'>Hi ima vendor dashboard</h1>
       </div>
       </>
  )
}

export default dashboard