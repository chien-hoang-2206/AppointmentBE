
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id: {
        type: Number,
    },
    patientId: {
        type: Number,
    },
    appointmentId: {
        type: Number,
    },
    time: {
        type: Date,
    },
    bloodPressure: {
        type: Number,
    },
    temperature: {
        type: Number,
    },
    respiratoryRate: {
        type: Number,
    },
    height: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    left_eye_power: {
        type: Number,
    },

    right_eye_power: {
        type: Number,
    },

    systolic_bp: {
        type: Number,
    },

    diastolic_bp: {
        type: Number,
    },

    diagnosis: {
        type: Number,
    },

    result: {
        type: Number,
    },

    status: {
        type: Number,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Booking', userSchema);
