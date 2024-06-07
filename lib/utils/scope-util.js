const isFormat = require('@node-oauth/formats');
const InvalidScopeError = require('../errors/invalid-scope-error');
const whiteSpace = /\s+/g;

module.exports = {
  parseScope: function (requestedScope) {
    if (requestedScope == null) {
      return undefined;
    }
    if (typeof requestedScope === 'object'
        && typeof requestedScope?.length === 'number'
        && requestedScope.length >= 1) {
      requestedScope = requestedScope.join(' ')
    }

    if (typeof requestedScope !== 'string') {
      throw new InvalidScopeError('Invalid parameter: `scope`');
    }

    // XXX: this prevents spaced-only strings to become
    // treated as valid nqchar by making them empty strings
    requestedScope = requestedScope.trim();

    if(!isFormat.nqschar(requestedScope)) {
      throw new InvalidScopeError('Invalid parameter: `scope`');
    }

    return requestedScope.split(whiteSpace);
  }
};
