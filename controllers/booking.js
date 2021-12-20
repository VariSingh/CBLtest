const Booking = require("../models/booking");
const Pumps = require("../models/pumps");
const uuidv4 = require('uuid/v4');
const mongoose = require('mongoose');
const { validate, handleErrors } = require("../lib");
const { request } = require("../app");


// Create booking
exports.create = async (req, res) => {
    try {
        //fetch nearest pumps
        let vehiclesArr = await req.body.vehicles.map(function(v) { return v.fillingType });
        const pumps = await Pumps.find({
            location: {
                $near: {
                 $maxDistance: 1000,//1 km
                 $geometry: {
                  type: "Point",
                  coordinates: [req.body.coordinates[0], req.body.coordinates[1]]
                 }
                }
               },
               fillingType: { "$in": vehiclesArr }
        }).exec();

       
       if(pumps.length>0){
           let pumpId = pumps[0]._id;
           const booking = new Booking({
            ...req.body,
            pump:pumpId,
            userId: new Object("61bc0383ffc18b3d5c196a66")
        });
         const savedBooking = await booking.save();
         if(savedBooking){
            res.json({message:"Booking successfull", details:booking});
         }else{
            res.json({message:"Some error occured while creating booking"});
         }
        
       }else{
           res.json({message:"No pumps available nearby"});
       }
        return res.json(pumps);
    } catch (error) {
        const { errorMessage, status } = handleErrors(error);
        return res.status(status).json(errorMessage);
    }
}