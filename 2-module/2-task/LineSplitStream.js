const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options = {}) {
    super(options);        
  
    this.encoding = options.encoding || 'utf-8'
    this.rest = ''
  }


  _transform(chunk, encoding, callback) {
    //console.log(encoding) ?
    if (Buffer.isBuffer(chunk)) chunk = chunk.toString(this.encoding)

    if (this.rest) {
      chunk = this.rest + chunk
      this.rest = ''
    }

    const lines = chunk.split(os.EOL)

    if (!chunk.endsWith(os.EOL)) {
      this.rest = lines.pop()
    }
     
    lines.map((line) => this.push(line))

    callback()
  }
    
  _flush(callback) {
    //console.log('wtf') ?
    if (this.rest) {
      this.push(this.rest)
      this.rest = ''
    }
    
    callback()
  }
}

module.exports = LineSplitStream;
