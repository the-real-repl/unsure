import { Task } from '../models';

export async function all(req, res) {
  const tasks = await Task.find();
  res.success(tasks)
}

export async function create(req, res) {
  const task = new Task(req.body);
  const ret = await task.saveAsync();

  res.success(ret[0]);
}

export async function show(req, res) {
  res.success(req.task);
}

export async function update(req, res) {
  Object.assign(req.task, req.body);
  const ret = await req.task.saveAsync();

  res.success(ret[0]);
}

export async function destroy(req, res) {
  await req.task.removeAsync();

  res.success();
}

export async function run(req, res) {
  const {lang, code} = req.task;

  try {
    const ret = await req.task.execute({lang, code});
    return res.success(ret);
  } catch (e) {
    return res.error();
  }
}
