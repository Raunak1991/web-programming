const mongoCollections = require("../config/mongoCollections");
const classes = mongoCollections.classes;
const uuid = require('node-uuid');

let exportedMethods = {
    getAllClass() {
        return classes().then((data) => {
            return data.find({},{code:true,_id:0}).toArray();
        });
    },
    
    getClassById(id) {
        return classes().then((data) => {
            return data.findOne({ _id: id }).then((data) => {
                if (!data) throw "data not found";
                return data;
            });
        });
    },
    getClassCode(code) {
        return classes().then((data) => {
                return data.findOne({ code:code },{_id:0,name:1,professor:1,description:1}).then((data) => {
                if (!data) throw "data not found";
                return data;
            });
        });
    },
    addClass(code,name, professor,description) {
        return classes().then((data) => {
            let newClass = {
                code:code,
                name:name,
                professor:professor,
                description:description,
                _id: uuid.v4()
            };

            return data.insertOne(newClass).then((newInsertInformation) => {
                return newInsertInformation.insertedId;
            }).then((newId) => {
                return this.getClassById(newId);
            });
        });
    },
    removeClass(id) {
        return classes().then((data) => {
            return data.removeOne({ _id: id }).then((deletionInfo) => {
                if (deletionInfo.deletedCount === 0) {
                    throw (`Could not delete class with id of ${id}`)
                }
            });
        });
    },
    updatedClass(code,name, professor,description) {
        return this.getClassById(id).then((currentClass) => {
            let updatedClass = {
               code:code,
                name:name,
                professor:professor,
                description:description,
                _id: uuid.v4()
            };

            return clasCollection.updateOne({ _id: id }, updatedClass).then(() => {
                return this.getClassById(id);
            });
        });
    },
}

module.exports = exportedMethods;