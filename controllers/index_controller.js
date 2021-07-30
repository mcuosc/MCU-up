const IndexModel = require('../models/index_model');

indexModel = new IndexModel();

module.exports = class IndexController {
    sayHiController(req, res ,next) {
        // do something
        // 呼叫特定的 model
        // 從資料庫將資料撈完後進行res.render的動作。
    }
}
