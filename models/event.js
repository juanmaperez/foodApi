const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const User = require('./user');
const FoodCategory = require('./foodCategory');

const eventSchema = new Schema({
  title:            { type: String, required: true },
  description:      { type: String, required: true },
  image:            { type: String, required: true },
  recipe:           { type: String, required: true },
  ingredients:      { type: Array, required: true },
  date:             { type: Date, required: true },
  time:             { type: String, required: true },  
  _foodCategory:    { type: Schema.Types.ObjectId, ref: 'FoodCategory', required: true },
  cookingTime:      { type: String, required: true },
  contribution:     { type:Number, required:true },  
  _host:            { type: Schema.Types.ObjectId, ref: 'User', required: true },
  _guests:          [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  comments:         [{ 
                        type: Object, 
                        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
                        comment: {type:String, required:true },
                        timestamps: {
                            createdAt: "created_at",
                            updatedAt: "updated_at"
                        }
                    }],  
  location:         {
                        type: [Number], // [<longitude>, <latitude>]
                        index: '2d', required: true
                    },
  city :            {type: String, required: true},
  evaluation:       [{type: Number, require:true}],
                    }, 
{ timestamps:       { createdAt: "created_at",
                    updatedAt: "updated_at"
                    }
}
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;