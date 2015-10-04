import P from 'bluebird';
import { transform } from 'babel-core';

export default async function(code) {
  const transpiled = transform(code).code;
  try {
    return eval(transpiled);
  } catch (e) {
    throw e;
  }
}
