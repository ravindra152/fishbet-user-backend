'use strict'

module.exports = function (sequelize, DataTypes) {
  const VerificationModal = sequelize.define('VerificationModals', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    userName: {
      type: DataTypes.STRING
    },
    dateOfBirth: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'VerificationModals',
    schema: 'public',
    timestamps: true,
    underscored: false
  })

  return VerificationModal
}
