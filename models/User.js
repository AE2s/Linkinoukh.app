const mongoose = require ('mongoose');

const UserSchema = new mongoose.Schema({
    firstname : {
        type: String,
        trim: true
    },
    lastname : {
        type: String,
        trim: true
    },
    function : {
        type: String,
        trim: true
    },
    email : {
        type: String,
        trim: true,
        unique: true
    },
    tel : {
        type: String,
        trim: true
    },
    birthdate : {
        type: String,
        trim: true
    },
})

module.exports = mongoose.models.User || mongoose.model('User',UserSchema);