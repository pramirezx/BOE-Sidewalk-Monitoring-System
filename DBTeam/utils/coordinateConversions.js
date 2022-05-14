const EARTH_RADIUS = 6378137;
const HALF_EARTH_RADIUS = EARTH_RADIUS / 2;

/*

These functions allow the conversion between
spatial reference 3857 and 4326. 

*/
// Converts SR 3857 to SR 4326
export const xyToLngLat = (x = 0, y = 0) => {
  let lon = (x / EARTH_RADIUS) * 57.29577951308232;
  lon = lon - 360 * Math.floor((lon + 180) / 360);
  let lat =
    57.29577951308232 *
    (Math.PI / 2 - 2 * Math.atan(Math.exp(-y / EARTH_RADIUS)));
  if (x === 0) return lat;
  if (y === 0) return lon;
  return [lon, lat];
};

// Converts SR 4326 to SR 3857
export const lngLatToXY = (lng = 0, lat = 0) => {
  let x = 0.017453292519943 * lng * EARTH_RADIUS;
  let y = lat * 0.017453292519943;
  y = HALF_EARTH_RADIUS * Math.log((1 + Math.sin(y)) / (1 - Math.sin(y)));

  if (lat === 0) return x;
  if (lng === 0) return y;
  return [x, y];
};
