import { lngLatToXY, xyToLngLat } from "../utils/coordinateConversions.js";

/*

Converts a list of coordinates to either SR 3857 to 4326 or vice versa.

*/
/*

Request body structure:

{
  from: 3857,
  to: 4326,
  coordinates: [[lon, lat]] <-- list of either [lon, lat] or [x, y] coordinates to be converted.
}

*/

export const convertQuery = async (params = {}) => {
  try {
    let converter;
    if (params.from == 3857) {
      converter = xyToLngLat;
    } else if (params.from == 4326) {
      converter = lngLatToXY;
    }

    return params.coordinates.map((coord) => converter(coord[0], coord[1]));
  } catch (err) {
    console.error("Error converting coordinates convertQuery");
    throw err;
  }
};
