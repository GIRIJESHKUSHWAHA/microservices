const db = require("../models");
config = require('config');
const Orders = db.orders;

// Updating user details 
exports.createOrder = async (req, res) => {
      try {
            const orderDetails = {
                  userId: req.body.id || "",
                  mobile: req.body.mobile || "",
                  userName: req.body.userName || "",
                  productId: req.body.productId || "",
                  productName: req.body.productName,
                  productImage: req.body.productImage || "",
                  productPrice: req.body.productPrice
            };
            Orders.create(orderDetails)
                  .then(data => {
                        res.send({
                              message: "Order created successfully!",
                              data: data,
                        });
                  })
                  .catch(err => {
                        res.status(500).send({
                              message:
                                    err.message || "Some error occurred while Order creating!"
                        });
                  });
      } catch (err) {
            res.status(500).send({
                  message:
                        err.message || "Some error occurred while Order creating."
            });
      }
};
exports.getOrders = async (req, res) => {
      try {
            // where: { userId: req.params.userId }
            await Orders.findAll({})
                  .then(data => {
                        //check if user exists
                        if (!data) {
                              res.status(400).send({
                                    message: "Orders not found!"
                              });
                              return;
                        } else {
                              res.status(200).send({
                                    data: data
                              });
                              return;
                        }
                  })
                  .catch(err => {
                        res.status(500).send({
                              message:
                                    err.message || "Some error occurred while retrieving users."
                        });
                  });
      } catch (err) {
            res.status(500).send({
                  message:
                        err.message || "Some error occurred while Order creating."
            });
      }
};

exports.getOrder = async (req, res) => {
      try {
            // where: { userId: req.params.userId }
            await Orders.findAll({ where: { userId: req.params.id } })
                  .then(data => {
                        //check if user exists
                        if (!data) {
                              res.status(400).send({
                                    message: "Orders not found!"
                              });
                              return;
                        } else {
                              res.status(200).send({
                                    data: data
                              });
                              return;
                        }
                  })
                  .catch(err => {
                        res.status(500).send({
                              message:
                                    err.message || "Some error occurred while retrieving users."
                        });
                  });
      } catch (err) {
            res.status(500).send({
                  message:
                        err.message || "Some error occurred while Order creating."
            });
      }
};

