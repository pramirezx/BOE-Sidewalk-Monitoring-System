// Operators to reference and help
// generate queries
const QUERY_OPERATORS = {
  eq: "=",
  ne: "!=",
  is: "IS",
  not: "IS NOT",
  or: "OR",
  gt: ">",
  gte: ">=",
  lt: "<",
  lte: "<=",
};

const DEFAULT_PARAMS = {
  limit: 50,
  offset: 0,
  attributes: [],
  where: {},
  table: ["sdwk.rover_data"],
  orderBy: {
    cols: [],
    order: "ASC",
  },
  groupBy: [],
};

/*
sqlHandler helps convert request parameters
into a SQL statement to be passed to a db
driver.

*/

export const sqlHandler = (p) => {
  const params = {
    ...DEFAULT_PARAMS,
    ...p,
  };
  const { where } = params;
  let whereItems = [];

  // This section generates '' necessary for string
  // item in sql statement.

  /*
  The statement string generated would be:
    SELECT * from A WHERE name = John
  which would be invalid thus this section
  determines whether a where item needs quotes.
  So the statement string would be:
    SELECT * from A WHERE name = 'John'

  It also determines whether the where item
  is a join statement rather than a where value.
  */
  for (const k in where) {
    let item = where[k];
    let keys = Object.keys(item);
    let val = item[keys[0]];
    let keyItem = item[keys[0]];
    if (typeof val === "string") {
      for (let i = 0; i < params.table.length; i++) {
        if (val.match(new RegExp(params.table[i], "gm"))) {
          keyItem = item[keys[0]];
          break;
        } else {
          keyItem = `'${item[keys[0]]}'`;
        }
      }
    }

    whereItems.push(`${k} ${QUERY_OPERATORS[keys[0]]} ${keyItem}`);
  }

  // Compiles the where clause items
  let whereStr =
    whereItems.length > 0 ? `WHERE ${whereItems.join(" AND ")}` : "";

  // All columns are retrieved, otherwise columns from the attributes array.
  let attributes =
    params.attributes?.length > 0 ? params.attributes.join(", ") : "*";
  if (params.groupBy.length > 0) {
    let groupByStr = `GROUP BY ${params.groupBy.join(", ")}`;
    whereStr += groupByStr;
  }

  // Generates the ordering clause
  if (params.orderBy?.cols?.length > 0) {
    whereStr += ` ORDER BY ${params.orderBy.cols.join(", ")} ${
      params.orderBy.order
    }`;
  }

  // Generates the string that defines the request quantity and offset.
  // Similar to LIMIT and OFFSET from other dbs, e.g. MySql
  let limitStr = `FETCH FIRST ${params.limit} ROWS ONLY`;
  if (params.offset > 0) {
    limitStr = `OFFSET ${params.offset} ROWS ${limitStr}`;
  }

  // The compilation of the entire SQL statement.
  const query = `SELECT ${topStr}${attributes} FROM ${params?.table.join(
    ", "
  )} ${whereStr} ${limitStr}`;

  console.log("Statement generated", query);
  // Regex removes double spaces
  return query.replace(/ {2,}/gm, " ");
};
