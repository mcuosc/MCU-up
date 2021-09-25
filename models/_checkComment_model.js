
const classAndIDs = require(__dirname + "/../data/class_ids_names.json");
const CourseUser = require("./schema/user_model");
const CourseRate = require("./schema/rating_model");
const ObjectId = require("mongodb").ObjectID;

module.exports = function checkComment(req) {
    return new Promise(function (resolve, reject) {
        let myID = req.session.passport.user
        let my_department_id = "";
        /*
        CourseUser.find(
            { _id: ObjectId(req.session.passport.user) }, 
            (err, found) => {
            if (!err) {
                my_department_id = found[0].profile.email.slice(2, 4)
                let my_department_name = classAndIDs[my_department_id]
                if ( 
                    (req.body.name===my_department_name) 
                    
                ) resolve(req)
                else reject(err)
            }
        })
        */
        resolve(req)
        //reject(true)
    }
)}