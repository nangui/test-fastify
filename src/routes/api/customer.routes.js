export default async (app, opts) => {
  app.get('/customers', async (request, reply) => {
      reply.send({ data: 'All Customers' });
  });
};