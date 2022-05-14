import { spawn } from child_process;
import multer from 'multer';

/*

This is a very ad hoc implementation and only tested locally. You
will have to adjust it along with the python scripts to work properly.

Make sure the environment is setup to run python and appropriate libraries are
installed.

As you can see the implementation is not idea. You'd but it was originally
designed to work on machines with low memory, hence it writes to the server(not recommended for production).

Highly recommended to rebuild this feature if expecting real world use.
*/


export const uploadCSV = async (ctx, params = {}) => {
  try {
    let table = params.table
    let python;
    let success = false
    if (table === 'rover') {
      python = spawn('python', ['rover_csv.py'])
    } else if (table === 'gopro') {
      python = spawn('python', ['gopro_csv.py'])
    }
    if (python) {
      python.on('close', (code) => {
        success = true
      })
    }
    return {
      success,
    }
  } catch (err) {
    console.error("Error uploading csv data");
    throw err;
  }
};
