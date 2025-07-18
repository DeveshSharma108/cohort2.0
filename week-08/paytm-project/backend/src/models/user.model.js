import mongoose,{Schema} from 'mongoose'
const userSchema = new Schema(
    {
        username:{
            type: String,
            required:true,
            unique:true,
            trim:true,
            lowercase:true,
            minLength:3,
            maxLength:30

            
        },
        password:{
            type:String,
            required:true,
            minLength:6
        },
        firstname:{
            type: String,
            required:true,
            trim:true,
            minLength:1,
            maxLength:15
            
        },
        lastname:{
            type: String,
            required:false,
            trim:true,
            maxLength:15
        }
    }
)

export const User = mongoose.model("User",userSchema)
