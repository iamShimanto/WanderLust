const express = require("express");
const app = express();
const mongoosh = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const Listing = require("./models/listing.js");
const ejsMate = require("ejs-mate");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

main()
  .then(() => {
    console.log("Db Connected");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoosh.connect(
    "mongodb+srv://shimanto925pabna:WK4t6ezKJV5vZwMt@cluster0.soq7ojv.mongodb.net/"
  );
}

app.get("/", (req, res) => {
  res.send("This is root page");
});

// =========== index route
app.get("/listing", async (req, res) => {
  let allLIsting = await Listing.find({});
  res.render("index.ejs", { allLIsting });
});

// ========== new route
app.get("/listing/new", (req, res) => {
  res.render("new.ejs");
});

// ============ create new listing
app.post("/listing", async (req, res) => {
  let newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listing");
});

// =========== show route
app.get("/listing/:id", async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("show.ejs", { listing });
});

// ======== update route
app.get("/listing/:id/edit", async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("edit.ejs", { listing });
});

app.put("/listing/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listing/${id}`);
});

// ======= delete route
app.delete("/listing/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listing");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
