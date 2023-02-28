 import { createSlice } from "@reduxjs/toolkit";

 export const roomSlice=createSlice({
    name:'rooms',
    initialState:{value:null},
    reducers:{
        rooms:(state,action)=>{
            state.value=action.payload;
        }
    }
 })

 export const {rooms} =roomSlice.actions;
 export default roomSlice.reducer;