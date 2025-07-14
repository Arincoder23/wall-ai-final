const express = require("express");
const axios = require("axios");
const app = express();

const PIXABAY_API_KEY = "51218803-d3f43b5d77cdbf3fda52e627a";

app.set("view engine", "ejs");
app.use(express.static("public"));


app.get("/", async (req, res) => {
  const query = req.query.search || "nature";

  try {
    const response = await axios.get("https://pixabay.com/api/", {
      params: {
        key: PIXABAY_API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        per_page: 12
      }
    });

    res.render("index", { images: response.data.hits, query });
  } catch (error) {
    console.error("Error fetching from Pixabay:", error);
    res.send("An error occurred while fetching images.");
  }
});

app.get("/prices", (req, res) => {
  res.render("prices");
});


app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});