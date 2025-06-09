const mongoosh = require("mongoose");
const Listing = require("../models/listing.js");
const InitData = require("./data.js");

main()
  .then(() => {
    console.log("Db Connected");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoosh.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initDb = async () => {
  Listing.deleteMany({});
  Listing.insertMany(InitData.data);
  console.log("data initilized successfull!");
};

initDb();
