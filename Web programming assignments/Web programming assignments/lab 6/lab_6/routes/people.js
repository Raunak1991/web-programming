const express = require('express');
const router = express.Router();
const data = require("../data");

const peopleData = data.people;
const eventData = data.events;

// Single Person Page
router.get("/:id", (req, res) => {
    // Find a person by the provided id, 
    let personId = parseInt(req.params.id);
    var pplD = {};
    var events = [];

 
    peopleData.getPerson(personId).then((singlepplData) => {
        pplD = singlepplData;

    }).then(() => {
        eventData.getEventsForAttendee(personId).then((data) => {
            events = data.slice();
        });



    }).then(() => {
        res.render('people/single', { people: pplD, events: events });

    }) .catch(() => {
           res.status(404).render('layouts/error', {title: "Sorry, page not found"});        
        return;
        });
    //  res.render("misc/debug", { debug: true, modelData: { something: "SomeValue" } });
});

// People Index Page

router.get("/", (req, res) => {
    // Display a list of all people; it can be in an unordered list, or a table

    peopleData.getAllPeople().then((allpplData) => {
       
        res.render('people/index', { people: allpplData });
    }).catch((err) => {
        res.status(500).json({ error: err });

    });

    //res.render("misc/debug", { debug: true, modelData: { something: "SomeValue" } });
});

module.exports = router;