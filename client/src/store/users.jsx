import { createSlice } from "@reduxjs/toolkit";

export const userSlice=createSlice({
   name:'users',
   initialState:{value:null},
   reducers:{
       users:(state,action)=>{
           state.value=action.payload;
       }
   }
})

export const {users} =userSlice.actions;
export default userSlice.reducer;