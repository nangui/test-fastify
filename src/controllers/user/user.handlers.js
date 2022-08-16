import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getUsersHandler = async function (req, reply) {
  const users = await prisma.user.findMany()
  reply.send(users)
}

export const getUserHandler = async function (req, reply) {
  const { id } = req.params;
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id
    }
  })

  reply.send(user)
}

export const addUserHandler = async function (req, reply) {
  const self = this;
  
  const { email, password, firstName, lastName } = req.body;
  const hashedPassword = await self.bcrypt.hash(password)

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      profile: {
        create: {
          lead: false
        }
      }
    }
  })

  reply.send({
    data: user
  })
}

export const updateUserHandler = async function (req, reply) {
  const { id } = req.params;
  const body = req.body;
  const user = await prisma.user.update({
    where: {
      id
    },
    data: {
      ...body
    }
  })

  reply.send(user)
}

export const deleteUserHandler = async function (req, reply) {
  const { id } = req.params;
  const user = await prisma.user.delete({
    where: {
      id
    }
  })

  reply.send(user)
}