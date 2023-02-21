import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useState,useContext,useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { vendorSignup } from '@/config/venderEndpoints';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '@/context/AuthContext';
import { vendorDatafetch } from '@/config/venderEndpoints';






const theme = createTheme();



export default function VendorOtp() {
    const router=useRouter();

    const [otp,SetOtp]=useState('');
    const [otps,setOtps]=useState(false);
    const [otpErr,setOtpErr]=useState(false)

    const {vendorDetails,setVendorDetails}=useContext(AuthContext);


  
    useEffect(()=>{
        async function invoked(){
            if(localStorage.getItem('vendortoken')){
                const data=await vendorDatafetch({'vendortoken':localStorage.getItem('vendortoken')})
                if(data.status=='failed'){
                    if(vendorDetails){

                    }else{
                        router.push('/vendor/signup')
                        
                    }
                   
                }else if(data.auth){
                    router.push('/vendor')
                }else{

                }
            }else{

            }
            if(Object.keys(vendorDetails).length==0){
                router.push('/vendor/signup')
            }else{
              toast.warn('Do not refresh!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            }
        }
        invoked()

    },[])


let venderOtpVerify=async(e)=>{
    try{
        e.preventDefault();
         if(otp =='' || otp === null){
            console.log('otp ulli keri check cheydu')
            setOtps(true);
            setOtpErr('please Enter a valid otp')
         }else{
            setOtps(false);
            setOtpErr('');
            await vendorDetails.otpChecking.confirm(otp)
            const data=await vendorSignup (vendorDetails)
            console.log(data)
            if(data.status=='success'){
                localStorage.setItem('vendortoken',data.token)
                toast.success( `Wow! ${data?.message}`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    }); 
                    router.push('/vendor')

            }
         }

    }catch(error){
        toast.error(`please Enter the valid otp`,{
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            })
    }
    
}
  
    // const data = new FormData(event.currentTarget);
    // localStorage.setItem('usertoken',data.token);  
    

 

  return (
    <ThemeProvider theme={theme}>
    <ToastContainer />
      <Container sx={{ paddingBottom:'4%' }} component="main" maxWidth="sm">
        <CssBaseline />
        <Box xs={12}
          sx={{
            marginTop:8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingRight:3,
            paddingLeft:3,
            boxShadow:4,
            borderColor:'grey.500',
            borderRadius:0,
            position:'relative',
          }}
        >   <Grid container sx={{justifyContent:'center',px:8}}>
        <Grid sx={{align:'center'}}>
            <img className='h-[250px] w-[85%] sm:w-[85%] h-[200px]' src='/logo/venderotp.jpg'/>
            <Typography component="h1" variant="h5"  sx={{fontStyle:'-moz-initial',color:'GrayText',textAlign:'center'}}>
            Otp verification
          </Typography>
        </Grid>
          
          </Grid>
          <Box component="form" noValidate onSubmit={venderOtpVerify} sx={{ mt: 3,px:8 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="otp"
                  onChange={(e)=>SetOtp(e.target.value)}
                  label="Otp"
                  error={otps}
                  helperText={otpErr}
                  name="otp"
                  autoComplete=""
                />
              </Grid>
              <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 6, mb: 2 ,mx:6, backgroundColor:'#1976d2 !important' }}
            >
              Sign Up
            </Button>
            
             <Grid item xs={12} sx={{ display:'flex' }}>
                <Grid item xs={6} sx={{ mr:2,mx:2,mb:3 }}>
                <hr/>
                </Grid>
                <Grid item xs={6} sx={{ ml:2,mx:3 }}>
                <hr/>     
                </Grid>
            </Grid>

            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}