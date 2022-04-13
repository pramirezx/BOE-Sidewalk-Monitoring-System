/*
Possibly no longer needed but converts a polygon string
into an array of ring style coordinates.
*/

const COORD_REGEX = /(-*\d+\.\d+ -*\d+\.\d+)/gm;

export const polygonToRings = (str) => {
  let coords = str
    .match(COORD_REGEX)
    .map((c) => c.split(" ").map((coord) => parseFloat(coord)));

  return coords;
};
