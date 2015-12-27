
/**
 * Module dependencies.
 */

import * as command from '../../src/commands/scrap-currency-pair-command';
import _ from 'lodash';
import ValidationFailedError from '../../src/errors/validation-failed-error';
import should from 'should';

/**
 * Test `ScrapCurrencyPairCommand`.
 */

describe('ScrapCurrencyPairCommand', () => {
  describe('run()', () => {
    it('should fail if `pair` is undefined', async function() {
      try {
        await command.run({ });

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(ValidationFailedError);
        e.pair.show().assert.should.equal('HaveProperty');
      }
    });

    it('should fail if `pair` is invalid', async function() {
      try {
        await command.run({ pair: 'bar' });

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(ValidationFailedError);
        e.pair[0].show().assert.should.equal('Count');
      }
    });

    it('should return undefined values if it was unable to resolve the desired pair', async function() {
      const pair = ['FOO', 'BAR'];
      const tick = await command.run({ pair });
      const key = _.keys(tick)[0];
      const value = _.values(tick)[0];

      tick.should.be.an.Object();
      key.should.equal('BARFOO');
      _.isUndefined(value.ask).should.equal(true);
      _.isUndefined(value.bid).should.equal(true);
    });

    it('should return the currency pair tick', async function() {
      const pair = ['USD', 'EUR'];
      const tick = await command.run({ pair });
      const key = _.keys(tick)[0];
      const value = _.values(tick)[0];

      tick.should.be.an.Object();
      key.should.equal('USDEUR');
      value.ask.should.be.above(value.bid);
    });

    it('should return the available currency pair tick', async function() {
      const pair = ['KES', 'JPY'];
      const tick = await command.run({ file: 'foo', pair });
      const key = _.keys(tick)[0];
      const value = _.values(tick)[0];

      tick.should.be.an.Object();
      key.should.equal('JPYKES');
      value.ask.should.be.above(value.bid);
    });
  });
});

