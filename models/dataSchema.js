const mongoose = require('mongoose')
require('dotenv').config();

const contactSchema = new mongoose.Schema({
    fullName:{
        type: String
    },
    companyName:{
        type: String
    },
    email:{
        type: String,
        lowercase: true,
    },
    mobile:{
        type: Number,
    },
    address: {
        type: String
    },
    city: {
        type: String,
        default: 'Coimbatore'
    },
    state: {
        type: String,
        default:'Tamil nadu'
    },
    country: {
        type: String,
        default: 'India'
    },
    pincode: {
        type: Number,
        required: true
    },
    map: {
        type: String
    },
    website: {
        type: String
    }
}, {versionKey: false, collection:"contacts"})

const ContactModel = mongoose.model('contacts', contactSchema)
module.exports = {ContactModel};