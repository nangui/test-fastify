const typeString = { type: 'string' };

const user = {
  type: 'object',
  properties: {
    id: typeString,
    email: typeString,
    firstName: typeString,
    lastName: typeString
  }
}

export const loginSchema = {
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: typeString,
      password: typeString
    }
  },
  response: {
    200: {
      message: typeString,
      data: {
        token: typeString,
        user: user
      }
    }
  }
}

export const registerSchema = {
  body: {
    type: 'object',
    required: ['email', 'password', 'firstName', 'passwordConfirm'],
    properties: {
      email: typeString,
      password: typeString,
      firstName: typeString
    }
  },
  response: {
    200: {
      message: typeString
    }
  }
}
