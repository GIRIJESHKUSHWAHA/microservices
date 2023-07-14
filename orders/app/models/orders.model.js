module.exports = (sequelize, Sequelize) => {
      const Orders = sequelize.define("orders", {
            userId: {
                  type: Sequelize.INTEGER,
                  // references: {
                  //       model: 'users',
                  //       key: 'id',
                  // }
            },
            mobile: {
                  type: Sequelize.STRING
            },
            userName: {
                  type: Sequelize.STRING
            },
            productId: {
                  type: Sequelize.STRING
            },
            productName: {
                  type: Sequelize.STRING
            },
            productImage: {
                  type: Sequelize.STRING
            },
            productPrice: {
                  type: Sequelize.STRING
            },
      });
      return Orders;
};
