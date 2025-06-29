const { DataTypes, Model } = require('sequelize');
const connection = require('../config/connection');

class ProductModel extends Model {
  static associate({ProductImageModel, ProductOptionsModel, CategoryModel, ProductCategoryModel}) {

    ProductModel.hasMany(ProductImageModel, {
      foreignKey: 'product_id',
      as:'images'
    });

    ProductModel.hasMany(ProductOptionsModel, {
      foreignKey: 'product_id',
      as:'options'
    });

    ProductModel.belongsToMany(CategoryModel, {
      through: ProductCategoryModel,
      as: 'categories',
      foreignKey: 'product_id',
      otherKey: 'category_id'
    });

  };
}

ProductModel.init(
  {
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
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
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    price_with_discount: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  },
  {
    tableName: 'products',
    sequelize: connection,
    timestamps: true
  },
);

module.exports = ProductModel;