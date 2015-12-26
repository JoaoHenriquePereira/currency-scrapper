
/**
 * Module dependencies.
 */

import Xray from 'x-ray';

export default function (url, paginate, select) {
  return new Promise((resolve, reject) => {
    const xray = Xray();

    xray(url, paginate, select)((error, result) => {
      if (error) {
        reject(error);
      }

      resolve(result);
    });
  });
}

