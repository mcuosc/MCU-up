var express = require('express');
var router = express.Router();

const IndexController = require('../controllers/index_controller');

indexController = new IndexController();

router.get('/', indexController.homeController);

module.exports = router;
