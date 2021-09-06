const getTest = require("../models/test_model");

/**
* The example of controller
*
* 示範 model 與 controller 之間的互動關係
*/
module.exports = class ExampleController {
    test(req, res) {
      res.send("just controller test");
    }

    testModel(req, res) {
      const query = req.params;
      getTest(query).then(
        (result) => {
          res.json(result);
        },
        (err) => {
          console.error(err);
        }
      );
    }

}
