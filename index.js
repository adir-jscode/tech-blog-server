const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.e7c956c.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const db = client.db("technical-blog");
    const postCollection = db.collection("posts");

    app.get("/posts", async (req, res) => {
      const cursor = postCollection.find({});
      const product = await cursor.toArray();

      res.send(product);
    });

    await client.connect();
    console.log("connected ");
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello from tech!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
