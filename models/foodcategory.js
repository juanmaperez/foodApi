const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const User = require('./user');
const Event = require('./event');

const foodCategorySchema = new Schema({
    title: {type: String, required:true},
    description: {type: String, required:true},
    icon: {type: String, required:true},
    events : [{ type: Schema.Types.ObjectId, ref: 'Event', required: true }],
    members : [{ type: Schema.Types.ObjectId, ref: 'User', required: true }]},
    {   
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  });
  
  const FoodCategory = mongoose.model("FoodCategory", foodCategorySchema);
  
  module.exports = FoodCategory;