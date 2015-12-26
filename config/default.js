'use strict';

/**
 * Export `configuration`.
 */

module.exports = {
  delay: {
    ddos: Math.floor(Math.random() * (1000 - 500) + 500)
  },
  output: {
    folder: 'data'
  }
}
