const mongoose = require("mongoose")
const { Schema } = mongoose

const userSchema = new Schema({
    nome: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    hashPass: String
}, { timestamps: true })

const Users = mongoose.model('Users', userSchema)

module.exports = Users