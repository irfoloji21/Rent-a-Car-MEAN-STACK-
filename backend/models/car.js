const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    power: { type: String, required: true },
    seats: { type: Number, required: true },
    imgUrl: { type: String, required: true },
});

module.exports = mongoose.model('Car', carSchema);
