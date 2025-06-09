const mongoosh = require("mongoose");
const Schema = mongoosh.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    filename: {
      type: String,
      default: "listingimage",
    },
    url: {
      type: String,
      default:
        "https://unsplash.com/photos/a-pathway-leading-to-a-field-of-flowers-Hj2J0pG5ktg",
      set: (v) =>
        v === ""
          ? "https://unsplash.com/photos/a-pathway-leading-to-a-field-of-flowers-Hj2J0pG5ktg"
          : v,
    },
  },
  price: {
    type: Number,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
});

const Listing = mongoosh.model("Listing", listingSchema);

module.exports = Listing;
