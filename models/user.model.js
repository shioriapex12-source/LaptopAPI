const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: String,
    pwd: String,
    phone: String,
    active: Boolean,
    role: String,
    verify_token: String
});

userSchema.pre('save', async function(next) {
    if(!this.isModified("pwd")) {
        return next;
    }
    const salt = await bcrypt.genSalt(10);
    this.pwd = await bcrypt.hash(this.pwd, salt);
})

module.exports = mongoose.model('users', userSchema);