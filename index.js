const express = require("express");
const app = express();
const mongoosh = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const Listing = require("./models/listing.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

main()
  .then(() => {
    console.log("Db Connected");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoosh.connect("mongodb://127.0.0.1:27017/wanderlust");
}

app.get("/", async (req, res) => {
  let sampleListing = new Listing({
    title: "Shimanto",
    description: "I am from bangladesh",
    price: 2000,
    location: "Dhaka",
    country: "Bangladesh",
  });

  await sampleListing
    .save()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  res.send("Test successfull!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
