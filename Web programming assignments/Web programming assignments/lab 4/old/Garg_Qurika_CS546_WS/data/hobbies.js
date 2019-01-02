const mongoCollections = require("../config/mongoCollections");
const hobbies = mongoCollections.hobbies;
const uuid = require('node-uuid');

let exportedMethods = {
    getAllHobbies() {
        return hobbies().then((data) => {
            return data.find({},{_id:0,information:0}).toArray();
        });
    },
   
    getHobbyById(id) {
        return hobbies().then((data) => {
            return data.findOne({ _id: id }).then((hobby) => {
                if (!hobby) throw "hobby not found";
                return hobby;
            });
        });
    },
    getHobbyByName(findName) {
        return hobbies().then((data) => {
                return data.findOne({ hobby: findName }).then((hobby) => {
                if (!hobby) throw "hobby not found";
                return hobby;
            });
        });
    },
    addHobby(hobby, information) {
        return hobbies().then((data) => {
            let newHobby = {
               hobby:hobby,
                information:information,
                _id: uuid.v4()
            };

            return data.insertOne(newHobby).then((newInsertInformation) => {
                return newInsertInformation.insertedId;
            }).then((newId) => {
                return this.getHobbyById(newId);
            });
        });
    },
    removeHobby(id) {
        return hobbies().then((data) => {
            return data.removeOne({ _id: id }).then((deletionInfo) => {
                if (deletionInfo.deletedCount === 0) {
                    throw (`Could not delete hobby with id of ${id}`)
                }
            });
        });
    },
    updateHobby(name, information) {
        return this.getHobbyById(id).then((currentHobby) => {
            let updatedHobby = {
                hobby: name,
                information: information
            };

            return hobbyCollection.updateOne({ _id: id }, updatedHobby).then(() => {
                return this.getHobbyById(id);
            });
        });
    },
}

module.exports = exportedMethods;