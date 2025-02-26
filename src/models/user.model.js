import mongoose, { Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const userSchema = new Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true // to make search faster if any field you want to search on
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String,//cloudinary link
            required: true,
        },
        coverImage: {
            type: String,//cloudinary link
            
        },

        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Video'
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required'],
        },

        refreshToken: {
            type: String,
           
        },
       

        
    },
    {
        timestamps: true,
    }

)

userSchema.pre("save",async)

export const User = mongoose.model('User', userSchema);