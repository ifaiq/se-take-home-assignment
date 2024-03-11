
  const router = require("express").Router();
  const orderController = require('../controllers/orderController')
  
  //CREATE ORDER
  router.post("/normalOrder", orderController.normalOrderAPI);
  
  router.post("/vipOrder", orderController.vipOrderAPI);
  
  router.post("/addBot", orderController.addBotAPI);

  router.delete("/removeBot", orderController.removeBotAPI);


  module.exports = router;