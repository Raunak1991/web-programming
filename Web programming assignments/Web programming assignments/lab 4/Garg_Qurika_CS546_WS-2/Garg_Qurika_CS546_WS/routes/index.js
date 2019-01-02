const classRoutes = require("./classes");
const hobbiesRoutes = require("./hobbies");
const educationRoutes = require("./education");

const constructorMethod = (app) => {
    app.use("/classes", classRoutes);
    app.use("/hobbies", hobbiesRoutes);
    app.use("/education", educationRoutes);
    app.use("*", (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;