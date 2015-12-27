'use strict';

/**
 * Export `configuration`.
 */

module.exports = {
  delay: {
    ddos: Math.floor(Math.random() * (1000 - 500) + 500)
  },
  scrapper: {
    output: {
      folder: 'data'
    },
    pair: ['EUR', 'USD'],
    period: {
      unit: 'seconds',
      value: 10
    }
  }
}
