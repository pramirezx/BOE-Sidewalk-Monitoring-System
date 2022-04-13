import { getQueryString } from "./utils/objToQuery.js";
import { sqlHandler } from "./utils/sqlHandler.js";

const test_params = {
  limit: 50,
  attributes: [],
  where: {
    INPUT_SW_ID: {
      eq: "sdwk.gp_meta.ROVER_SW_ID",
    },
    DATE: {
      gt: "2021-11-10",
    },
  },
  table: ["sdwk.rover_data", "sdwk.gp_meta"],
  orderBy: {
    cols: [],
    order: "ASC",
  },
};

const test_distinct = {
  limit: 50,
  attributes: ["DISTINCT(DATE)", "INPUT_SW_ID"],
  where: {},
  table: ["sdwk.rover_data"],
  orderBy: {
    cols: [],
    order: "ASC",
  },
};

const test_groupby = {
  limit: 50,
  attributes: [],
  where: {},
  table: ["sdwk.rover_data"],
  groupBy: ["DATE"],
  orderBy: {
    cols: [],
    order: "ASC",
  },
};

const test_1 = sqlHandler(test_distinct);
console.log(test_1);
const test_2 = sqlHandler(test_params);
console.log(test_2);

const test_3 = getQueryString(test_params);
console.log(test_3);

const test_4 = sqlHandler(test_groupby);
console.log(test_4);
