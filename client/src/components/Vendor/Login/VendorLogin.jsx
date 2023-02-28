import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { vendorLogin } from '@/config/venderEndpoints';



const theme = createTheme();

export default function  VendorLogin() {
  const router=useRouter()

  const [email,setEmail]=useState(false);
  const [emailErr,setEmailErr]=useState(false)

   
 
 


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let obj={
      email:data.get('email'),
      password:data.get('password')
    }
    console.log(obj)

    if(obj.email && obj.password){
      let loginEmail=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if(loginEmail.test(obj.email)){
             setEmail(false);
             setEmailErr('')
             const data=await vendorLogin(obj)
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

             }else{
              toast.error(`OOPS! ${data?.message}`,{
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
      }else{
        setEmail(true);
        setEmailErr('Please enter valid email !')
      }


    }else{
      toast.error(`OOPS! All fields are required`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
    
  };

  return (
    <ThemeProvider theme={theme}>
    <ToastContainer />
      <Container sx={{ paddingBottom:'4%' }} component="main" maxWidth="sm">
        <CssBaseline />
        <Box xs={12}
          sx={{
            marginTop:12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingLeft:4,
            paddingRight:4,
            paddingTop:6,
            boxShadow:4,
            borderColor:'grey.500',
            borderRadius:0,
            position:'relative',
          }}
        >   <Grid container>
          <Typography component="h1" variant="h5" align='left' sx={{fontStyle:'-moz-initial',color:'GrayText'}}>
          Vendor Login
          </Typography>
          </Grid>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  error={email}
                  helperText={emailErr}
                  name="email"
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="password"
                  required
                  fullWidth
                  id="password"
                  type='password'
                  label="Password"
                  autoFocus
                />
              </Grid>
    

              <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 ,mx:3, backgroundColor:'#1976d2 !important' }}
            >
              Sign in
            </Button>
            <Grid container justifyContent="flex-start ">
              <Grid>
                <Box variant="body2" sx={{textDecoration:0,color:'black',mx:3,color:'gray'}}>
                  Create Account ?
                   <Link href='/vendor/signup' style={{color:'#1976d2'}}> Click here</Link>
                </Box>
              </Grid>
            </Grid>
            
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
