
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    image: {
        type: String,
    },
    address: {
        type: String,
    },
});

module.exports = mongoose.model('Branch', userSchema);
