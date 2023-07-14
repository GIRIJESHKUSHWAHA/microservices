module.exports = app => {
  const orders = require("../condroller/orders-controller.js");
  var router = require("express").Router();
  const auth = require("../middleware/auth.js")

  // Create a new orders
  router.post("/createorders",auth.verifyToken, orders.createOrder);

  // get orders list
  router.get("/getorders", orders.getOrders);

   router.get("/getorder/:id", orders.getOrder);


  app.use('/', router);


};
