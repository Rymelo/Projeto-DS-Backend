const { DataTypes, Model } = require('sequelize');
const ProductModel = require('./ProductModel');
const CategoryModel = require('./CategoryModel');
const connection = require('../config/connection');

class ProductCategoryModel extends Model { }

ProductCategoryModel.init(
    {
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: ProductModel,
                key: 'id'
            },
            onDelete: "CASCADE"
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: CategoryModel,
                key: 'id'
            },
            onDelete: "CASCADE"
        }
    },
    {
        tableName: 'product_category',
        sequelize: connection
    }
);

module.exports = ProductCategoryModel;