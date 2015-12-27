
/**
 * Module dependencies.
 */

import * as command from './commands/scrap-currency-pair-command';
import _ from 'lodash';
import Promise from 'bluebird';
import appRoot from 'app-root-path';
import config from 'config';
import debugnyan from 'debugnyan';
import fs from 'fs';
import moment from 'moment';

/**
 * Promisify writer.
 */

Promise.promisifyAll(fs);

const log = debugnyan('scrapper');
const options = config.get('scrapper');
const sync = moment.duration(options.period.value, options.period.unit);

log.debug(`Getting ${options.pair.join('')} ticks every ${sync.asSeconds()} seconds`);

/**
 * Loop.
 */

(() => {
  async function run() {
    try {
      const file = `${moment().format('YYYYMMDD')}-${options.pair.join('')}.dat`;
      const tick = await command.run({ pair: options.pair });
      const output = `${appRoot}/${options.output.folder}/${file}`;
      const pair = _.keys(tick)[0];

      await fs.appendFileAsync(output, `values for ${pair} -> ${moment().format('YYYY.MM.DD HH:mm:ss')} -> Ask: ${tick[pair].ask}; Bid: ${tick[pair].bid}\n`);
    } catch (e) {
      log.debug(`Failed to scrap ${options.pair.join('')} "${e.stack}"`);
    }
  }

  setInterval(async function() {
    await run();
  }, sync.asMilliseconds());
})();
