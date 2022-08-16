import fp from 'fastify-plugin'

const config = async function (app, opts) {
  await app.register(import('@fastify/jwt'), {
    secret: process.env.JWT_SECRET
  })

  app.decorate('authenticate', async function (req, reply) {
    try {
      await req.jwtVerify()
    } catch(err) {
      reply.send(err)
    }
  })
}

export default fp(config)
