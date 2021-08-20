var express = require('express');
var router = express.Router();

const ExampleController = require('../controllers/example_controller');

const exampleController = new ExampleController();

router.get('/', exampleController.test);
router.get('/model/:str', exampleController.testModel)

/**
* The example of router
* 示範 router 將請求轉移至 controller 的過程
*/
module.exports = router;
