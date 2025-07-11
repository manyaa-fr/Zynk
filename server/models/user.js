const { address } = require('framer-motion/client');
const mongoose = require ('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        maxlength: [100, 'Name cannot exceed 100 characters']
    },

    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
        trim: true,
        maxlength: [30, 'Username cannot exceed 30 characters']
    },

    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email'
        ]
    },

    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: true
    },

    verifyOTP: {
        type: String,
        default: ''
    },

    verifyOTPexpires: {
        type: Number,
        default: 0
    },

    resetOTP:{
        type: String,
        default: ''
    },

    resetOTPexpires: {
        type: Number,
        default: 0
    },

    address: {
        country: {
            type: String,
            default: ''
        },
        state: {
            type: String,
            default: ''
        },
        city: {
            type: String,
            default: ''
        }
    },

    preferences: {
        categories: {
        type: [String],
        enum: ['music', 'sports', 'arts', 'food', 'technology', 'business', 'social', 'fashion', 'cars', 'concert', 'standups', 'magic', 'education', 'other'],
        default: []
        },

        notificationRadius: {
        type: Number,
        default: 100, // in kilometers
        min: 1,
        max: 1000
        }
    },

    savedEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],

    createdAt: {
        type: Date,
        default: Date.now
    }
});


const userModel = mongoose.models.user || mongoose.model('user', UserSchema);
module.exports = userModel;