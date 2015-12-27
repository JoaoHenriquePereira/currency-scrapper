
/**
 * Module dependencies.
 */

import _ from 'lodash';
import x from '../utils/xray';
import { Assert } from '../validator';
import { validate } from '../validator';

/**
 * Get pair.
 */

async function getPair(pair) {
  let url = `http://www.investing.com/currencies/${pair.join('-')}`;
  let [bid, ask] = await x(url, '#quotes_summary_secondary_data', ['.inlineblock']);

  if (!ask || !bid) {
    url = `http://www.investing.com/currencies/${pair.reverse().join('-')}`;
    [bid, ask] = await x(url, '#quotes_summary_secondary_data', ['.inlineblock']);
  }

  return _.object([pair.join('')], [{ ask, bid }]);
}

/**
 * Export `ScrapCurrencyPairCommand`.
 */

export async function run(options) {
  validate(options, { pair: [new Assert().Required(), new Assert().Count(2)] });

  const { pair } = options;

  return await getPair(pair);
}
