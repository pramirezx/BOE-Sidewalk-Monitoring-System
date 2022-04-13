import { mapSdwkSR } from "../utils/mapSdwkSR.js";

/*

Should be a deprecated endpoint and queryTester(after renaming)
endpoint should be used as the latter can perform the same tasks.

Requests from the sdwk.rover_data based off of INPUT_SW_ID.

*/

export const roverDataquery = async (ctx, params = {}) => {
  try {
    const query = `SELECT TOP (${params.where.LIMIT || 50}) [ID]
,[INPUT_SW_ID]
,[RAW_GPS]
,[LATITUDE]
,[LONGITUDE]
,[DATE]
,[SLOPE_X]
,[SLOPE_Y]
,[Shape]
,[RECORD_FILE]
,[SRID]
,[TIME]
,[X_AXIS_TEMP]
,[Y_AXIS_TEMP]
,[SPEED]
FROM [sdwk].[rover_data] where INPUT_SW_ID = ${
      params.where.INPUT_SW_ID || 123
    }`;
    let result = await ctx.sql.request().query(query);
    return parseInt(params.where.srout) === 4326
      ? result?.recordset?.map(mapSdwkSR)
      : result?.recordset;
  } catch (err) {
    console.error("Error retrieving rover data from roverDataQuery");
    throw err;
  }
};
