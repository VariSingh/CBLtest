const Pumps = require("../models/pumps")
const uuidv4 = require('uuid/v4');
const mongoose = require('mongoose');
const { validate, handleErrors } = require("../lib");


exports.fetchNearestPumps = async (req, res) => {
    try {

        // Validate parameters
        const validatePayload = validate(["coordinates"], req.body);

        if (validatePayload) {
            return res.status(400).json(validatePayload);
        }

        let vehiclesArr = await req.body.vehicles.map(function(v) { return v.fillingType });
        const pumps = await Pumps.find({ 
            fillingType: { "$in": vehiclesArr },
            location: {
                $near: {
                 $maxDistance: 1000,//1 km
                 $geometry: {
                  type: "Point",
                  coordinates: [req.body.coordinates[0], req.body.coordinates[1]]
                 }
                }
               }
        }).exec();

      

        return res.json(pumps);
    } catch (error) {
        //const { errorMessage, status } = handleErrors(error, "email");

        return res.status(400).json(error);
    }
}
