import {
  loginHandler,
  registerHandler
} from '../../controllers/auth/auth.handlers.js'

import {
  loginSchema,
  registerSchema
} from '../../controllers/auth/auth.schemas.js'

const loginOpts = {
  schema: loginSchema,
  handler: loginHandler
}

const registerOpts = {
  schema: registerSchema,
  handler: registerHandler
}

export default async (app, opts) => {
  app.post('/login', loginOpts);
  app.post('/register', registerOpts);
};
