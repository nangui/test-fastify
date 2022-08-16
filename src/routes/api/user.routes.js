import {
  addUserHandler,
  deleteUserHandler,
  getUserHandler,
  getUsersHandler,
  updateUserHandler
} from "../../controllers/user/user.handlers.js";

import {
  addUserSchema,
  deleteUserSchema,
  getUserSchema,
  getUsersSchema,
  updateUserSchema
} from "../../controllers/user/user.schemas.js";

const URL = '/api/users'
const POST_METHOD = 'POST'

const getUsersOpts = {
  schema: getUsersSchema,
  handler: getUsersHandler,
};

const getUserOpts = {
  schema: getUserSchema,
  handler: getUserHandler,
};

const addUserOpts = {
  schema: addUserSchema,
  handler: addUserHandler,
};

const updateUserOpts = {
  schema: updateUserSchema,
  handler: updateUserHandler,
};

const deleteUserOpts = {
  schema: deleteUserSchema,
  handler: deleteUserHandler,
};

export default async (app, opts) => {

  // app.addHook('preValidation', async function (req, reply) {
  //   const self = this;
  //   if (req.url === URL && req.method === POST_METHOD) {
  //     const hashedPassword = await self.bcrypt.hash(req.body.password)
  //     req.body = { ...req.body, password: hashedPassword }
  //   }
  // })

  app.get('/users', getUsersOpts);
  app.get('/users/:id', getUserOpts);
  app.post('/users', addUserOpts);
  app.put('/users/:id', updateUserOpts);
  app.delete('/users/:id', deleteUserOpts);
};