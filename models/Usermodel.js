const mongooes = require('mongoose');

const UserSchema = new mongooes.Schema({
    name: {
        type: String,
        required: true,
        min: 4,
        max: 50
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 24
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    Date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongooes.model('User', UserSchema);