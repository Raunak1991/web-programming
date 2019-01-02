const express = require('express');
const router = express.Router();
const data = require("../data");

const locationData=data.locations;
const eventData=data.events;


// Single Location Page

var locationDetails={};
var eventDetails={};
router.get("/:id", (req, res) => {
    // Find a location by the provided id, 
let locationId=req.params.id;
 // then display its information

    locationData.getLocation(parseInt(locationId)).then((singleData)=>{
        locationDetails=singleData;
    })
    .then(()=>{
        eventData.getEventForLocation(parseInt(locationId)).then((data)=>{
           eventDetails=data.slice();
        });     
    }).then(()=>{
        res.render('locations/single',{locations:locationDetails,events:eventDetails});
    }) .catch(()=>{

        res.status(404).render('layouts/error', {title: "Sorry, page not found"});        
        return;   
    });

   //res.render("misc/debug", { debug: true, modelData: { something: "SomeValue" } });
});

// Location Index Page




router.get("/", (req, res) => {
    // Display a list of all locations; it can be in an unordered list, or a table
   
    // Each of these locations need to link to the single location page

locationData.getAllLocations().then((allData)=>{
    res.render('locations/index',{locations:allData});
}).catch((error)=>{
    res.status(500).json({error:error});
});



   // res.render("misc/debug", { debug: true, modelData: { something: "SomeValue" } });
});

module.exports = router;