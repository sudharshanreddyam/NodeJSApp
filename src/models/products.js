'use strict';
module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    reviews: DataTypes.TEXT
  }, {});
  Products.associate = function(models) {
    // associations can be defined here
  };
  return Products;
};