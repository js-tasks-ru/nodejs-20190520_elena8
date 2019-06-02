const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this._limit = options.limit
    this._str = ''
  }

  _transform(chunk, encoding, callback) {
  	chunk = chunk.toString('utf-8')
  	this._str += chunk
  	if (this._str.length > this._limit) {
  		callback( new LimitExceededError() )
  	}
  	this.push(chunk);
  	callback()
  }
}

module.exports = LimitSizeStream;
