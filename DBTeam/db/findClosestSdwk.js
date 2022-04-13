import { lngLatToXY, xyToLngLat } from "../utils/coordinateConversions.js";
import { mapSdwkSR } from "../utils/mapSdwkSR.js";

/*

This endpoint is useful for finding the closest 
sidewalk data from sdwk.sidwalks_wm table given
2 coordinates. If the coordinates are provided in 
SRID 4326 format then a parameter of srin with values 
4326 must be provided to work properly, otherwise SRID
3857 format is accepted by default.

This is useful for associating a sidewalk id to a given
coordinate.
*/

export const findClosestSdwk = async (ctx, params = {}) => {
  try {
    let [lon, lat] =
      params?.srin === 4326
        ? lngLatToXY(params.coordinates[0], params.coordinates[1])
        : params.coordinates;
    console.log("this is the lon lat", lon, lat);
    const query = `select top(${params.TOP || 1}) [OBJECTID]
      ,[Shape]
      ,[SIDEWALK_ID]
      ,[ASSETID]
      ,[FEATURETYPE]
      ,[PIND]
      ,[CALC_WIDTH]
      ,[CALC_LENGTH]
      ,[CALC_MIN_WIDTH]
      ,[CALC_MAX_WIDTH]
      ,[NOTES]
      ,[CRTN_DT]
      ,[USER_ID]
      ,[LST_MODF_DT]
      from sdwk.sidewalks_wm as b order by b.Shape.STDistance(geometry::STGeomFromText('POINT(' + cast(${lon} as varchar) + ' ' + cast (${lat} as varchar) + ')', 3857)) `;
    let result = await ctx.sql.request().query(query);

    return parseInt(params.srout) === 4326
      ? result?.recordset?.map(mapSdwkSR)
      : result?.recordset;
  } catch (err) {
    console.error("Error retrieving rover data from findClosestSdwk");
    throw err;
  }
};
