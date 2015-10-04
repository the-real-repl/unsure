import P from 'bluebird';
import request from 'superagent-bluebird-promise';

export default async function({lang, code}) {
  const execRes = await request
    .post('https://eval.in/')
    .type('form')
    .send({
      lang,
      code,
      utf8: 'λ',
      execute: 'on'
    });
  const jsonPath = `${execRes.redirects[0]}.json`;
  const jsonRes = await request.get(jsonPath);

  const parsed = JSON.parse(jsonRes.text);
  if (parsed.status.substring(0,2) !== 'OK') {
    throw parsed.output;
  }
  return parsed.output;
}
