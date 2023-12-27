import mongoose from "mongoose";
import { nanoid } from "nanoid";

export const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    minPoolSize: 10,
    maxPoolSize: 400,
  });
};

export const db = mongoose.connection.useDb("item_management", {
  useCache: true,
});

export const ItemSchema = mongoose.Schema({
  _id: {
    type: String,
    default: () => nanoid(8),
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  seller: {
    type: String,
  },
  location: {
    type: String,
  },
  warranty: {
    type: String,
  },
  payment: {
    type: Boolean,
    default: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});
