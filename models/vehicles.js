const mongoose = require("mongoose");
const { Schema } = mongoose;

const VehicleSchema = new Schema({
    name: { type: String, required: true, index: true  },
    regNo:{ type: String }
}, { timestamps: true });

const Vehicle = mongoose.model("Vehicles", VehicleSchema);


module.exports = Vehicle;