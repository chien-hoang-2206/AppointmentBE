
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    comment: {
        type: String,
    },
    star: {
        type: Number,
    },
    doctorId: {
        type: Number,
    },
    userId: {
        type: Number
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Review ', userSchema);
