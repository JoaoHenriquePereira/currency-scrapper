
/**
 * Module dependencies.
 */

import ValidationFailedError from './errors/validation-failed-error';
import asserts from 'validator.js-asserts';
import debugnyan from 'debugnyan';
import { Assert, Constraint, Validator } from 'validator.js';

/**
 * Create logger instance.
 */

const log = debugnyan('cs:validator');

/**
 * Add custom asserts.
 */

const Asserts = Assert.extend(asserts);

/**
 * Validate data using constraints.
 */

function validate(data, constraints) {
  const validator = new Validator();
  const errors = validator.validate(data || {}, new Constraint(constraints, { deepRequired: true }));

  if (errors !== true) {
    log.warn({ errors }, 'Validation failed');

    throw new ValidationFailedError(errors);
  }
}

/**
 * Export `Assert` and `Constraint`.
 */

export { validate, Asserts as Assert, Constraint };
