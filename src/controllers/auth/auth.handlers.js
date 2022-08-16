import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export const loginHandler = async function (req, reply) {
  const self = this;
  const { email, password } = req.body;
  
  const failedResponse= {
    statusCode: 401,
    message: 'Login Failed: Your user email or password is incorrect'
  }
  
  const user = await prisma.user.findFirst({
    where: {
      email
    }
  })

  if (!user) {
    reply.code(401).send(failedResponse)
  }

  const match = await this.bcrypt.compare(password, user.password)

  if (!match) {
    reply.code(401).send(failedResponse)
  }

  const token = self.jwt.sign({ "user": `${user.firstName} ${user.lastName}` })

  reply.send(JSON.stringify({token}))
}

export const registerHandler = async function (req, reply) {
  const self = this;
  const { email, password, firstName, lastName, passwordConfirm } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      email
    }
  })
  
  if (user) {
    reply.code(409).send({
      statusCode: 409,
      message: 'User already exist'
    })
  }

  if (password !== passwordConfirm) {
    reply.code(400).send({
      statusCode: 400,
      message: 'Password and password confirm not match'
    })
  }

  const hashedPassword = await self.bcrypt.hash(password)

  const createdUser = await prisma.user.create({
    data: {
      email,
      password,
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
    statusCode: 200,
    message: 'User created'
  })
}
