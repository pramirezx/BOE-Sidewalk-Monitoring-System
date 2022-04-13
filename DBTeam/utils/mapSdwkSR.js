import { xyToLngLat } from "./coordinateConversions.js";
/*

Initially used to map SQL shape types received from
server into an array of objects containing x,y,z,m
values from shape.

*/
export const mapSdwkSR = (sdwk) => {
  sdwk.Shape.points = sdwk.Shape.points.map(({ x, y, z, m }) => ({
    x: xyToLngLat(x),
    y: xyToLngLat(0, y),
    z,
    m,
  }));
  return sdwk;
};
