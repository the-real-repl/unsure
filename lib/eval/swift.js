import request from 'superagent-bluebird-promise';

export default async function(code) {
  const res = await request
    .post('http://swiftstub.com/run/')
    .type('form')
    .send({code, version: 'gm'});
  const parsed = JSON.parse(res.text);
  return parsed.join("\n");
}
