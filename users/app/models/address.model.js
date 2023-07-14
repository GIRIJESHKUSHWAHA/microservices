module.exports = (sequelize, Sequelize) => {
  const Address = sequelize.define("address", {
    email: {
      type: Sequelize.STRING
    },
    alternate_mobile: {
      type: Sequelize.STRING
    },
    line1: {
      type: Sequelize.STRING
    },
    line2: {
      type: Sequelize.STRING
    },
    state: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    zip: {
      type: Sequelize.INTEGER
    },
    whatsapp_number: {
      type: Sequelize.STRING
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
         model: 'users',
         key: 'id',
      }
   }
  });
  return Address;
};
