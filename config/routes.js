import * as tasksCtrl from '../app/controllers/tasks_controller';

import resError from '../app/middlewares/res_error';
import resSuccess from '../app/middlewares/res_success';
import modelMagic from '../app/middlewares/model_magic';
import cors from '../app/middlewares/cors';

export default function(router) {
  router.use(cors);
  router.use(resError);
  router.use(resSuccess);

  router.all('/tasks/:id*', modelMagic('task'));

  router.get('/tasks', tasksCtrl.all);
  router.post('/tasks', tasksCtrl.create);
  router.get('/tasks/:id', tasksCtrl.show);
  router.patch('/tasks/:id', tasksCtrl.update);
  router.delete('/tasks/:id', tasksCtrl.destroy);
  router.post('/tasks/:id/run', tasksCtrl.run);
}
