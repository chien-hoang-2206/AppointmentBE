
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    reply: {
        type: String,
    },
    userReplyId: {
        type: String,
    },
    date: {
        type: Date,
    },
    createdBy: {
        type: Number,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Question', userSchema);
