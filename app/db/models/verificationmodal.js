'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VerificationModal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  VerificationModal.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userName: DataTypes.STRING,
    dateOfBirth: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'VerificationModal',
  });
  return VerificationModal;
};