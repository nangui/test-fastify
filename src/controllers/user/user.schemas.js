const typeString = { type: 'string' };

const properties = {
  email: typeString,
  password: typeString,
  firstName: typeString,
  lastName: typeString
}

const user = {
  type: 'object',
  properties: {
    id: typeString,
    email: typeString,
    firstName: typeString,
    lastName: typeString
  }
}

export const getUsersSchema = {
  response: {
    200: {
      type: 'array',
      items: user
    }
  }
}

export const getUserSchema = {
  params: {
    id: typeString
  },
  response: {
    200: user
  }
}

export const addUserSchema = {
  body: {
    type: 'object',
    required: ['email', 'password', 'firstName'],
    properties
  },
  response: {
    200: typeString
  }
}

export const updateUserSchema = {
  body: {
    type: 'object',
    properties
  },
  params: {
    id: typeString
  },
  response: {
    200: typeString
  }
}

export const deleteUserSchema = {
  params: {
    id: typeString
  },
  response: {
    200: typeString
  }
}
