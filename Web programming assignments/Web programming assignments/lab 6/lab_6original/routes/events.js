const express = require('express');
const router = express.Router();
const data = require("../data");
const eventData = data.events;
const peopleData = data.people;
const locationData = data.locations;

// Single Event Page
router.get("/:id", (req, res) => {
    var eventDetails = {};
    var attendeeName = [];
    var locationName="";
    let eventId = req.params.id;
    // then display its information
    eventData.getEvent(parseInt(eventId)).then((singleData) => {
        eventDetails = singleData;
        for (let i = 0; i < singleData.attendees.length; i++) {
            peopleData.getPerson(singleData.attendees[i]).then((subdata) => {
                attendeeName.push(subdata);
            });
        }
        locationData.getLocation(singleData.location).then((data) => {
            locationName=data.name.slice(0);
         
      });
 })
 .then(()=>{
      
        res.render('events/single', { events: eventDetails, attendeeName: attendeeName, locationName: locationName});
   
 })
        .catch(() => {
        res.status(404).render('layouts/error', {title: "Sorry, page not found"});        
        return;
        });
});

router.get("/", (req, res) => {
    eventData.getAllEvents().then((allData) => {
       res.render('events/index', { events: allData });
    }).catch((error) => {
        res.status(500).send({ errorr: error })
    });


    // res.render("misc/debug", { debug: true, modelData: { something: "SomeValue" } });
});

module.exports = router;