const mongoose = require("mongoose");

const CourseRate = require('./rating_model');

module.exports = function getCoursesInfo(query) {
  let result = {};
  return new Promise((resolve, reject) => {
    CourseRate.aggregate(
      [
        { $match: {$and: [{ teacher: query.teacher, subject: query.subject , isHidden:false},
                          {$and:[ {rateHomework:{$gt:0}},{rateLearning:{$gt:0}},{rateRecommendation:{$gt:0}}]} ] }
                          },
        {
          $group: {
            _id: null,
            homework: { $avg: "$rateHomework" },
            learning: { $avg: "$rateLearning" },
            recommendation: { $avg: "$rateRecommendation" },
          },
        },
      ],
      (err, ratings) => {
        if(err){
          console.log(err);
          result.status = "Fail to get data.";
          reject(result);
          return;
        }
        return ratings;
      }).then((ratings) => {
        CourseRate.find(
          { teacher: query.teacher, subject: query.subject, isHidden:false },//{userID:true},
          (err, found) => {
            if(err){
              console.log(err);
              result.status = "Fail to find data.";
              return result;
            }
            
            result = {
              teacherAndSubject: query,
              rating: ratings,
              data:found
            };
            
            resolve(result);
        })
      })

  });
};
