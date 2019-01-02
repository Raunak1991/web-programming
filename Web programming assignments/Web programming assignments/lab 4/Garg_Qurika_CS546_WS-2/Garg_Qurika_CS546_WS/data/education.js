const mongoCollections = require("../config/mongoCollections");
const education = mongoCollections.education;
const uuid = require('node-uuid');

let exportedMethods = {
    getAllEducation() {
        return education().then((data) => {
            return data.find({}).toArray();
        });
    },
   getEducationById(id) {
        return education().then((data) => {
            return data.findOne({ _id: id }).then((edu) => {
                if (!edu) throw "education not found";
                return edu;
            });
        });
    },
    getEducationByName(name) {
        return education().then((data) => {
                return data.findOne({ name: name }).then((edu) => {
                if (!edu) throw "education not found";
                return edu;
            });
        });
    },
    addEducation(name, school,degree) {
        return education().then((data) => {
            let newEducation = {
               name:name,
                school:school,
                degree:degree,
                _id: uuid.v4()
            };

            return data.insertOne(newEducation).then((newInsertInformation) => {
                return newInsertInformation.insertedId;
            }).then((newId) => {
                return this.getEducationById(newId);
            });
        });
    },
    removeEdu(id) {
        return education().then((data) => {
            return data.removeOne({ _id: id }).then((deletionInfo) => {
                if (deletionInfo.deletedCount === 0) {
                    throw (`Could not delete edu with id of ${id}`)
                }
            });
        });
    },
    updateEdu(name, school,degree) {
        return this.getEducationById(id).then((currentHobby) => {
            let updatedHobby = {
                name:name,
                school:school,
                degree:degree,
                _id: uuid.v4()
            };

            return hobbyCollection.updateOne({ _id: id }, updatedHobby).then(() => {
                return this.getEducationById(id);
            });
        });
    },
}

module.exports = exportedMethods;