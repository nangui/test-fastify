export default async (app, opts) => {
  app.get('/user', {
    onRequest: [app.authenticate]
  }, async function (req, reply) {
    reply.send(req.user)
  })
};