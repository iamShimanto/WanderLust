const express = require("express");
const app = express();
const mongoosh = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const Listing = require("./models/listing.js");
const ejsMate = require("ejs-mate");
const expressError = require("./utils/expressError.js");

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
app.get("/listing", async (req, res, next) => {
  try {
    let allLIsting = await Listing.find({});
    res.render("index.ejs", { allLIsting });
  } catch (error) {
    next(error);
  }
});

// ========== new route
app.get("/listing/new", (req, res) => {
  res.render("new.ejs");
});

// ============ create new listing
app.post("/listing", async (req, res, next) => {
  try {
    let newListing = new Listing(req.body.listing);

    if (!newListing.title) {
      throw new expressError(400, "Title is missing");
    }
    if (!newListing.description) {
      throw new expressError(400, "Description is missing");
    }
    if (!newListing.price) {
      throw new expressError(400, "Price is missing");
    }
    if (!newListing.country) {
      throw new expressError(400, "Country is missing");
    }
    if (!newListing.location) {
      throw new expressError(400, "Location is missing");
    }

    await newListing.save();
    res.redirect("/listing");
  } catch (err) {
    next(new expressError(400, "something went wrong"));
  }
});

// =========== show route
app.get("/listing/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("show.ejs", { listing });
  } catch (error) {
    next(new expressError());
  }
});

// ======== update route
app.get("/listing/:id/edit", async (req, res, next) => {
  try {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("edit.ejs", { listing });
  } catch (error) {
    next(new expressError(400, "something went wrong!"));
  }
});

app.put("/listing/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listing/${id}`);
  } catch (error) {
    next(new expressError());
  }
});

// ======= delete route
app.delete("/listing/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listing");
  } catch (error) {
    next(new expressError());
  }
});

app.use((req, res, next) => {
  next(new expressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message } = err;
  res.status(statusCode).render("error", { message });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
