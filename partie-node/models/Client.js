// models/Client.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    address: {
        type: String,
        required: false,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

// Hasher le mot de passe avant d'enregistrer un nouveau client
clientSchema.pre('save', async function(next) {
    const client = this;
    if (client.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        client.password = await bcrypt.hash(client.password, salt);
    }
    next();
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
