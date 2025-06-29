const { DataTypes, Model } = require('sequelize');
const connection = require('../config/connection');
const ProductModel = require('./ProductModel');

class ProductImageModel extends Model { }

ProductImageModel.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ProductModel,
        key: 'id'
      }
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    path: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  },
  {
    tableName: 'product_images',
    sequelize: connection
  },
);

module.exports = ProductImageModel;