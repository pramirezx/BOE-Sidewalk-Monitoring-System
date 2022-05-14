import express from "express";
import cors from "cors";
import { findClosestSdwk } from "./db/findClosestSdwk.js";
import { dbConnect } from "./db/index.js";
import { polygonQuery } from "./db/polygonQuery.js";
import { roverDataquery } from "./db/roverDataQuery.js";
import { gpmeta } from "./db/gpmeta.js";
import { queryTester } from "./db/queryTester.js";
import { queryParser } from "./utils/queryParser.js";
import { convertQuery } from "./db/convertQuery.js";

// You need to install this library first
import multer from "multer";
import { uploadCSV } from "./db/uploadCSV.js";

const DEFAULT_SRID = 3857;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Exposes cors. Highly recommended to designate specific IP/URL
//to prevent bad actors from acting.
app.use(cors({ credentials: true, origin: "*" }));

// Deprecated route. Use /db/query
app.get("/rover/where", async (req, res) => {
  const { query } = req;
  let pool = await dbConnect();
  let ctx = {
    sql: pool,
  };
  const where = {
    ...query,
  };
  const params = {
    where,
  };
  let data = await roverDataquery(ctx, params, "none");

  res.send(data);
});

// Deprecated route. Use /db/query
app.get("/sidewalk/where", async (req, res) => {
  const { query } = req;

  let pool = await dbConnect();
  let ctx = {
    sql: pool,
  };
  const where = {
    ...query,
  };
  const params = {
    where,
  };

  let data = await polygonQuery(ctx, params);
  res.send(data);
});

// Route will return JSON object containing row(s)
// of data from sdwk.sidewalk_wm table that contains
// sidewalk(s) closest to the given coordinate
app.get("/find/sidewalk", async (req, res) => {
  const { query } = req;
  let lon = query?.lon || 0;
  let lat = query?.lat || 0;
  let srin = query?.srin || DEFAULT_SRID;
  let srout = query?.srout || DEFAULT_SRID;
  let TOP = query?.TOP ? parseInt(query.TOP) : 1;
  let pool = await dbConnect();
  let ctx = {
    sql: pool,
  };
  const where = {
    TOP,
  };
  const params = {
    where,
    coordinates: [parseFloat(lon), parseFloat(lat)],
    srin: parseInt(srin),
    srout: parseInt(srout),
  };

  let data = await findClosestSdwk(ctx, params);
  res.send(data);
});
// Deprecated route. Use /db/query
app.get("/gpmeta/where", async (req, res) => {
  const { query } = req;

  let pool = await dbConnect();
  let ctx = {
    sql: pool,
  };
  const where = {
    ...query,
  };
  const params = {
    where,
  };

  let data = await gpmeta(ctx, params);
  res.send(data);
});

// Experimental endpoint but should be end goal
// for handling standard data requests.
app.get("/test/query", async (req, res) => {
  const { query } = req;
  let pool = await dbConnect();
  let ctx = {
    sql: pool,
  };
  let data = await queryTester(ctx, queryParser(query));
  res.send(data);
});
// Route convert coordinates
app.post("/convert/coordinates", async (req, res) => {
  console.log("The request body", req.body);
  let data = await convertQuery(req.body);
  res.send(data);
});
// Route to replace /test/query route
app.get("/db/query", async (req, res) => {
  const { query } = req;
  let pool = await dbConnect();
  let ctx = {
    sql: pool,
  };
  let data = await queryTester(ctx, queryParser(query));
  res.send(data);
});

// Yea, this works on a single file. It is advise to rebuild this whole feature.
const storage = multer.diskStorage({
  destination: "/temp/",
  filename: "rover_csv.csv",
});
// Make sure the folder is created before use
const uploadDest = multer({ dest: "/temp/", storage: storage });
app.post("/upload/csv", uploadDest.single("rover_csv"), async (req, res) => {
  const { query } = req;

  // Doesn't really need db access if python has access
  let pool = await dbConnect();
  let ctx = {
    sql: pool,
  };
  let data = await uploadCSV(ctx, { ...query });
  res.send({ ...data });
});

app.listen(process.env.PORT, () => {
  console.log(`Rover data server listening on port ${process.env.PORT}`);
});
