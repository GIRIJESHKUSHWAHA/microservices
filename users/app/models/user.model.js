module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    mobile: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    referral_code: {
      type: Sequelize.STRING
    },
    refferd_by: {
      type: Sequelize.STRING
    },
    isVerified: {
      type: Sequelize.BOOLEAN
    }
  });
  return User;
};
