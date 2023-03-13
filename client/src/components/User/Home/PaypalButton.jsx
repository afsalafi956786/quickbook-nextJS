import React from 'react'
import { PayPalButtons } from '@paypal/react-paypal-js';
import { paypalId } from '@/constance/constance'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
import swal from "sweetalert";
import { doBooking } from '@/config/userEndpoints';
import { useRouter } from 'next/router';




const  PaypalButton=({total,bookingData}) =>{
    const totalPrice=total *0.014

    const router=useRouter();
  
// const [booking,setBookingData]=useState({})
const handleApprove=async(orderID)=>{
    try{
        const data=await doBooking(bookingData,{'usertoken':localStorage.getItem('usertoken')})
        console.log(data,'paypal page..............')
     if(data?.status =='success'){
          router.push({
            pathname:'/success',
            query:{obj:JSON.stringify(data.booked)},
          });
          
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your booking has confirmed',
            showConfirmButton: false,
            timer: 1600
          })
          
        
     }else{
        toast.error(`OOPS! something errorrrrr`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });

     }

    }catch(error){
        console.log(error.message)

        // toast.error(`OOPS! something error`, {
        //     position: "top-center",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "dark",
        //   });
    }

}
    return (
        <>
  <PayPalScriptProvider options={{'client-id':paypalId}}>
  <ToastContainer />
    <PayPalButtons
    style={{
        color:'silver',
        layout:'horizontal',
        height:48,
        tagline:false,
        shape:'pill'

    }}
    onClick={(data,actions)=>{
        const alredyBought=false
        if(alredyBought){
            swal(
                "You already booked this room!",
                "Go to your account view your list of booking",
                "info"
              );
              return actions.reject()
        }else{
            return actions.resolve()
        }


    }}

    createOrder={(data,actions)=>{
        return actions.order.create({
            purchase_units:[
                {
                    description:'booking success',
                    amount:{
                        value:totalPrice
                        
                    }
                },
            ],
        })
    }}

    onApprove={async (data,actions)=>{
        const order=await actions.order.capture();
        handleApprove(data.orderID)
    }}
    onError={(err)=>{
        // Swal.fire({
        //     icon: 'error',
        //     title: 'Oops...',
        //     text: 'Something went wrong!',
        //     footer: '<a href="">Why do I have this issue?</a>'
        //   })
        swal("OOPS!!", "Something error!!", "error");
    }}
    onCancel={()=>{
        swal("Payment is canceled!", "You clicked the button!", "info");
        // router.push('/details')
        
    }}
    
    />
     </PayPalScriptProvider>
    </>
    )
}

export default PaypalButton