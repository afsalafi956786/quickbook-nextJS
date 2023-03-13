import mongoose, { Schema } from "mongoose";

const couponShema=new mongoose.Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    vendorId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'vendor'
    },
    couponCode:{
        type:String,
    },
    discount:{
        type:Number
    },
    startDate:{
        type:Date,
    },
    endDate:{
        type:Date,
    },
},{
    timestamps:true,
})
const couponModel=mongoose.model('coupon',couponShema)
export default couponModel