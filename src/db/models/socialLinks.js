'use strict'

module.exports = (sequelize, DataTypes) => {
  const SocialLinks  = sequelize.define('SocialLinks', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'id'
    },
    facebook: {
      type: DataTypes.STRING(200),
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    twitter: {
      type: DataTypes.STRING(200),
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    instagram: {
      type: DataTypes.STRING(200),
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    linkedin: {
      type: DataTypes.STRING(200),
      allowNull: true,
      validate: {
        isUrl: true
      }
    }
  }, {
    sequelize,
    tableName: 'social_links',
    schema: 'public',
    timestamps: true,
    underscored: true
  })

  SocialLinks.associate = (models) => {
    SocialLinks.belongsTo(models.User, { foreignKey: 'userId' })
  }

  return SocialLinks
}
