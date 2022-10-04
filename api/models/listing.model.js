import mongoose from "mongoose";
import { Property } from "./property.model.js";

const { Schema } = mongoose;

const listingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    listedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: Property,
      // required: true,
    },
    price: {
      type: String,
      // required: true,
    },
    rentalPrice: {
      week: String,
      fortnight: String,
      month: String,
    },
    sellingPrice: {
      type: String,
    },
  },
  { timestamps: true }
);

// listingSchema.pre("save", async function (next) {
//   const listing = this;
//   // console.log(listingSchema.property + "  adsf");
//   //   console.log(listing);
//   //   if (listing.property.isFor.sell) {
//   //     listing.sellingPrice = listing.price;
//   //   }
//   //   if (listing.property.isFor.rent) {
//   //     const price = parseFloat(listing.price);

//   //     listing.rentalPrice.week = price.toString();
//   //     listing.rentalPrice.fortnight = (price * 2).toString();
//   //     listing.rentalPrice.month = (price * 4).toString();
//   //   }
//   //   return next();
// });

// listingSchema.pre("save", async function (next) {
//   const listing = this;

//   listing.property = await Property.findById(listing.property);

//   return next();
// });

listingSchema.pre("save", async function (next) {
  const listing = this;
  const property = await Property.findById(listing.property._id);
  // console.log(listing);
  const { price } = listing;
  // console.log(isNaN(price));
  if (property.isFor.sell) {
    listing.sellingPrice = listing.price;
  }
  if (property.isFor.rent) {
    listing.rentalPrice.week = price.toString();
    listing.rentalPrice.fortnight = (price * 2).toString();
    listing.rentalPrice.month = (price * 4).toString();
  }
  return next();
});
export const Listing = mongoose.model("Listing", listingSchema);
