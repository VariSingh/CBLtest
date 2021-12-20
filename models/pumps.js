const mongoose = require("mongoose");
const { Schema } = mongoose;

const PumpSchema = new Schema({
    userId: { type: mongoose.Schema.ObjectId, ref: 'Users' },
    name: { type: String, required: true, index: true  },
    deleted:{type: Boolean,default: false },
    location: {
      type: { type: String },
      coordinates: [Number]
    },
}, { timestamps: true });

PumpSchema.index({ location: "2dsphere" });

const Pumps = mongoose.model("Pumps", PumpSchema);


module.exports = Pumps;