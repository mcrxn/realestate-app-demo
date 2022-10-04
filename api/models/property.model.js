import mongoose from "mongoose";

const { Schema } = mongoose;

const propertySchema = new Schema({
  landarea: {
    type: String,
  },
  buildingSize: {
    type: String,
  },
  mainFeatures: {
    bedrooms: Number,
    bathrooms: Number,
    kitchen: Boolean,
    balcony: Boolean,
  },
  additionalFeatures: {
    alarm: Boolean,
    pool: Boolean,
    solarPanels: Boolean,
    furnished: Boolean,
  },
  isFor: {
    sell: Boolean,
    rent: Boolean,
  },
});

export const Property = mongoose.model("Property", propertySchema);
