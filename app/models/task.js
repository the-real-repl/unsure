import P from 'bluebird';
import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';

import jsEval from '../../lib/eval/javascript';
import swiftEval from '../../lib/eval/swift';
import goEval from '../../lib/eval/golang';
import evalIn from '../../lib/eval/eval_in';

let Task = new Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  lang: {
    type: String,
    required: true
  }
});

Task.plugin(timestamps);

Task.methods.execute = async function({lang, code}) {
  return {
    // 'javascript': jsEval(code),
    'swift': swiftEval(code),
    'golang': goEval(code)
  }[lang] || evalIn({lang, code});
}

Task.pre('save', async function(next) {
  try {
    const {lang, code} = this;
    await this.execute({lang, code});
    next();
  } catch (e) {
    const err = new Error(e);
    next(err);
  }
})

module.exports = mongoose.model(`task`, Task);
P.promisifyAll(module.exports);
P.promisifyAll(module.exports.prototype);
