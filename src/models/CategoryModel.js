const { DataTypes, Model } = require('sequelize');
const connection = require('../config/connection');

class CategoryModel extends Model {}

CategoryModel.init(
  {
    name: {
        type: DataTypes.STRING(45), 
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING(45),
        allowNull: false
    },    
    use_in_menu: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true
    }
  },
  {
    tableName: 'categories',
    sequelize: connection,
    timestamps: true
  },
);

module.exports = CategoryModel;