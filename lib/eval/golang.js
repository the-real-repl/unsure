import request from 'superagent-bluebird-promise';

export default async function(code) {
  const res = await request
    .post('http://play.golang.org/compile')
    .type('form')
    .send({body: code, version: 2});
  const parsed = JSON.parse(res.text);
  if (parsed.Errors) {
    throw parsed.Errors;
  }
  return parsed.Events[0].Message;
}
