export default async (app, opts) => {
  app.get('/projects', async (request, reply) => {
      reply.send({ data: 'All Projects' });
  });
};