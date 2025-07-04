const mongoosh = require("mongoose");
const Listing = require("../models/listing.js");
const InitData = require("./data.js");

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

const initDb = async () => {
  await Listing.deleteMany({})
  await Listing.insertMany(InitData.data);
  console.log("data initilized successfull!");
};

initDb();

