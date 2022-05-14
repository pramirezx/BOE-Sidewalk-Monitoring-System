export const getQueryString = (obj, encode) => {
    function getPathToObj(obj, path = []) {
      let result = [];
  
      for (let key in obj) {
        if (!obj.hasOwnProperty(key)) return;
  
        //deep copy
        let newPath = path.slice();
        newPath.push(key);
  
        let everyPath = [];
        if (typeof obj[key] === "object") {
          everyPath = getPathToObj(obj[key], newPath);
        } else {
          everyPath.push({
            path: newPath,
            val: obj[key],
          });
        }
  
        everyPath.map((item) => result.push(item));
      }
  
      return result;
    }
  
    function composeQueryString(paths) {
      let result = "";
      paths.map((item) => {
        let pathString = "";
        if (item.path.length > 1) {
          pathString = item.path.reduce((a, b, index) => {
            return a + "[" + b + "]";
          });
        } else {
          pathString = item.path[0];
        }
  
        if (result) {
          pathString = "&" + pathString + "=" + item.val;
        } else {
          pathString = "?" + pathString + "=" + item.val;
        }
  
        result += pathString;
      });
  
      return result;
    }
  
    const str = composeQueryString(getPathToObj(obj));
    return encode === true ? encodeURI(str) : str;
  };
  
  export default getQueryString;