import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
    name: String,
    description: String,
  });
  
  export const Category = mongoose.model('Category', categorySchema);
  
  // Creating an item model
  const itemSchema = new mongoose.Schema({
    name: String,
    description: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    price: Number,
    quantity: Number,
  });
  
  export const Item = mongoose.model('Item', itemSchema);