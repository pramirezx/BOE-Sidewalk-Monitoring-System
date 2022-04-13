import { sqlHandler } from "../utils/sqlHandler.js";

/*

Experimental feature where the endpoint allows high flexibility of
generating a SQL statement without too many restrictions
on type of data requested.

Ideally security measures and authentication is implemented and will
be the main query used.

*/

export const queryTester = async (ctx, params = {}) => {
  try {
    let query = sqlHandler(params);

    let result = await ctx.sql.request().query(query);
    return result.recordset;
  } catch (err) {
    console.error("Error retrieving rover data from queryTester");
    throw err;
  }
};
