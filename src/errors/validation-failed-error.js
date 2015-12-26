
/**
 * Module dependencies.
 */

import StandardError from 'standard-error';

/**
 * Constructor.
 */

export default class ValidationFailedError extends StandardError {
  constructor(errors) {
    super('Validation Failed', errors);
  }
}
