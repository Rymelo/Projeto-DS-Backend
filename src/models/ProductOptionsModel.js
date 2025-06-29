const { DataTypes, Model } = require('sequelize');
const connection = require('../config/connection');
const ProductModel = require('./ProductModel');

class ProductOptionsModel extends Model { }

ProductOptionsModel.init(
    {
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: ProductModel,
                key: 'id'
            }
        },
        title: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        shape: {
            type: DataTypes.ENUM('square', 'circle'),
            defaultValue: 'square',
            allowNull: true
        },
        radius: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true
        },
        type: {
            type: DataTypes.ENUM('text', 'color'),
            defaultValue: 'text',
            allowNull: true
        },
        values: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    },
    {
        tableName: 'product_options',
        sequelize: connection
    },
);

module.exports = ProductOptionsModel;