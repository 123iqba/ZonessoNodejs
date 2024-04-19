const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    image:{
        type: String,
        required: true
    },
    description: {
      type: String,
      required: true
    },
    favorite: {
      type: Boolean ,
      required: true
    },
    trim: {
      type: String,
      required: true
    },
    year: {
      type: String,
      required: true
    },
    kilometer: {
      type: String,
      required: true
    },
    Regionalspace: {
      type: String,
      required: true
    },
    Doors: {
      type: String,
      required: true
    },
    Postedon: {
      type: String,
      required: true
    },
    postedby: {
      type: String,
      required: true
    },
    bodytype: {
      type: String,
      required: true
    },
    sellertype: {
      type: String,
      required: true
    },
    fueltype: {
      type: String,
      required: true
    },
    transmissiontype: {
      type: String,
      required: true
    },
    Horsepower: {
      type: String,
      required: true
    },
    cylinder: {
      type: String,
      required: true
    },
    Warrenty: {
      type: String,
      required: true
    },
    warrenty: {
      type: String,
      required: true
    },
    Exteriorcolor: {
      type: String,
      required: true
    },
    interiorcolor: {
      type: String,
      required: true
    },
    targetmarket: {
      type: String,
      required: true
    },
  });
  
  // Create the Product model
  const Product = mongoose.model('Product', ProductSchema);
  module.exports = Product;