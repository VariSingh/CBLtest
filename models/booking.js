const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookingSchema = new Schema({
    userId: { type: mongoose.Schema.ObjectId, ref: 'Users' },
    vehicles:[
      { type: mongoose.Schema.ObjectId, ref: 'Vehicles' },
    ],
    pump:{ type: mongoose.Schema.ObjectId, ref: 'Pumps' }
}, { timestamps: true });

const Booking = mongoose.model("Bookings", BookingSchema);


module.exports = Booking;