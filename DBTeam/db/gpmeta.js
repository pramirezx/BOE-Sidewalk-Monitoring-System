/*

This endpoint should be deprecated in favor of whatever queryTester
endpoint will be renamed into as the latter can perform the same
task.

*/

export const gpmeta = async (ctx, params = {}) => {
  try {
    const query = `select top(${
      params.where?.LIMIT || 1000
    }) * from sdwk.gp_meta`;
    let result = await ctx.sql.request().query(query);

    return result.recordset;
  } catch (err) {
    console.error("Error retrieving rover data from gpmeta");
    throw err;
  }
};
