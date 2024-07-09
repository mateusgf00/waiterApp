import { Schema, model } from "mongoose";

export const Product = model(
  "Product",
  new Schema({
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      required: true,
    },
    imagePath: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    ingredients: {
      required: true,
      type: [
        {
          name: {
            type: String,
            require: true,
          },
          icon: {
            type: String,
            require: true,
          },
        },
      ],
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
  })
);
