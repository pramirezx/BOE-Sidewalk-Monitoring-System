export const queryParser = (query) => {
  return Object.entries(query).reduce((obj, [key, value]) => {
    if (typeof value === "object") {
      if (Array.isArray(value)) {
        obj[key] = value;
        return obj;
      }
      obj[key] = queryParser(value);
    } else if (!isNaN(+value)) {
      obj[key] = +value;
    } else {
      obj[key] = value;
    }
    return obj;
  }, {});
};
let test_query = {
  query: {
    limit: "50",
    where: {
      INPUT_SW_ID: {
        eq: "sdwk.gp_meta.ROVER_SW_ID",
      },
    },
    table: ["sdwk.rover_data", "sdwk.gp_meta"],
    orderBy: {
      order: "ASC",
    },
  },
  srin: "3857",
};
