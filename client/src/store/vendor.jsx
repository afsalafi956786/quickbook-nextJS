import { createSlice } from "@reduxjs/toolkit";

export const vendorSlice=createSlice({
   name:'vendor',
   initialState:{value:null},
   reducers:{
       vendor:(state,action)=>{
           state.value=action.payload;
       }
   }
})

export const {vendor} =vendorSlice.actions;
export default vendorSlice.reducer;