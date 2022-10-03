import mongoose from "mongoose";

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
    // property: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Property",
    //   required: true,
    // },
  },
  { timestamps: true }
);

export const Listing = mongoose.model("Listing", listingSchema);
