import { mapSdwkSR } from "../utils/mapSdwkSR.js";

/*

Should be a deprecated endpoint and queryTester(after renaming)
endpoint should be used as the latter can perform the same tasks.

Requests from the sdwk.sidwalks_wm based off of SIDEWALK_ID.

*/
export const polygonQuery = async (ctx, params = {}) => {
  try {
    const query = `select top(${
      params.where?.LIMIT || 1
    }) * from sdwk.sidewalks_wm where SIDEWALK_ID = ${
      params.where.SIDEWALK_ID || 123
    }`;
    let result = await ctx.sql.request().query(query);

    return parseInt(params.where.srout) === 4326
      ? result?.recordset?.map(mapSdwkSR)
      : result?.recordset;
  } catch (err) {
    console.error("Error retrieving rover data from polygonQuery");
    throw err;
  }
};
