const noteListRoutes = require("./noteList");
const newNoteRoutes = require("./newNote");
const noteDetailsRoutes = require("./noteDetails");
const nextNoteRoutes = require("./nextNote");

//const todoData = require('../data');

const constructorMethod = (app) => {
       app.use('/new', newNoteRoutes);
    app.use('/', noteListRoutes);
    app.use('/next',nextNoteRoutes)
 
  //  app.use('/:note', noteDetailsRoutes);

    /*  app.get("/", function (request, response) {
          response.render("home", { pageTitle: "So Much ToDo!", todoItems: todoData.getAll() });
      });*/

    app.use("*", (req, res) => {
        res.sendStatus(404);
    })
};

module.exports = constructorMethod;