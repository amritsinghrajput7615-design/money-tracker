const mongoose = require('mongoose')


const transactionSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:String,
    amount:{
        type:Number,
        required:true
    },
    type:{
        type:String,
        enum:['income','expense']
    },
    date:{
        type:Date,
        default:Date.now
    },
    category:String

},{timestamps:true})

const transaction = mongoose.model('transaction',transactionSchema)
module.exports = transaction