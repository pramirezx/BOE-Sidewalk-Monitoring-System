import sql from "mssql";
import "dotenv/config";

/*

This piece sets up the configuration of the
database driver to allow it to connect to the
azure database containing the BOE/sidewalk data.

A .env file must be created in the format:

SDWK_DB_USERNAME="username"
SDWK_DB_PASSWORD="password"
SDWK_DB_NAME="databaseName"
SDWK_DB_SERVER="databaseServer"
PORT=3857

PORT would depend on how you configured the server.

This is done as minor security measures so that sensitive(db username/password)
is not hard coded and easily accessible to bad actors.
*/
const sqlConfig = {
  user: process.env.SDWK_DB_USERNAME,
  password: process.env.SDWK_DB_PASSWORD,
  database: process.env.SDWK_DB_NAME,
  server: process.env.SDWK_DB_SERVER,
  options: {
    encrypt: true,
  },
};

// dbConnect is where queries will be executed with.
export const dbConnect = async () => {
  try {
    let pool = await sql.connect(sqlConfig);
    return pool;
  } catch (err) {
    console.log("Error from db index");
    console.error(err);
    throw err;
  }
};
