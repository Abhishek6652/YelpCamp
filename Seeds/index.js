const mongoose = require("mongoose");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connection");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 401; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20);
    const camp = new Campground({
      author: '60e6659a504f5a27dc6d6c6b',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae veniam obcaecati, consequatur, accusamus ea nulla dolorum fugit ad porro corporis magni quisquam? Voluptatum ratione ipsum, hic labore facilis iste illo.',
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/abhishek6652/image/upload/v1625892204/YelpCamp/bvbsi8a5rcd0ziniutoh.jpg',
          filename: 'YelpCamp/bvbsi8a5rcd0ziniutoh'
        },
        {
          url: 'https://res.cloudinary.com/abhishek6652/image/upload/v1625892205/YelpCamp/xx7m20btiap1kzfzowk6.jpg',
          filename: 'YelpCamp/xx7m20btiap1kzfzowk6'
        }
      ]
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
