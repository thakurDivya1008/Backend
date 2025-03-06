// Import mongoose and Schema from mongoose
import mongoose, { Schema } from 'mongoose';

// Import jwt and bcrypt for token generation and password hashing
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Define the user schema
const userSchema = new Schema(
    {
        // Username field with various constraints
        username:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true // to make search faster if any field you want to search on in optimized way
        },
        // Email field with various constraints
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        // Fullname field with various constraints
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        // Avatar field for storing cloudinary URL link
        avatar: {
            type: String, // cloudinary url link
            required: true,
        },
        // Cover image field for storing cloudinary URL link
        coverImage: {
            type: String, // cloudinary link
        },
        // Watch history field to store references to Video documents
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Video'
            }
        ],
        // Password field with constraints
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        // Refresh token field
        refreshToken: {
            type: String,
        },
    },
    {
        // Enable timestamps to automatically add createdAt and updatedAt fields
        timestamps: true,
    }
)

// Pre-save hook to hash the password before saving the user document
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) { // to check if password is modified or not otherwise it will keep hashing the password
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10); // hash the password with bcrypt
    next();
})

// Method to compare the provided password with the hashed password
userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
}
userSchema.methods.generateAccessToken = function() {
 return jwt.sign(
    {
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName

    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}
userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            // email: this.email,
            // username: this.username,
            // fullName: this.fullName
    
        },

process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
      )
}

// Export the User model
export const User = mongoose.model('User', userSchema);