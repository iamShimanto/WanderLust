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
        "https://images.pexels.com/photos/30767897/pexels-photo-30767897/free-photo-of-modern-rustic-bedroom-with-brick-and-wood-elements.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      set: (v) =>
        v === ""
          ? "https://images.pexels.com/photos/30767897/pexels-photo-30767897/free-photo-of-modern-rustic-bedroom-with-brick-and-wood-elements.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
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
