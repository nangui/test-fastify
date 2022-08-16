import Fastify from 'fastify';
import { join } from 'desm';
import * as dotenv from 'dotenv'
dotenv.config()

export default async (opts) => {
    /**
     * @typedef {import('fastify').FastifyInstance}
     */
    const app = Fastify(opts);

    await app.register(import("fastify-blipp"));

    await app.register(import('fastify-bcrypt'), {
        saltWorkFactor: 12
    })

    await app.register(import('@fastify/swagger'), {
        exposeRoute: true,
        routePrefix: '/docs',
        swagger: {
            info: {
                title: 'Project Management API',
                description: 'This is an API for Project Management built with Fastify and Prisma',
                version: '0.1.0'
            },
            externalDocs: {
                url: 'https://swagger.io',
                description: 'Find more info here'
            },
            host: 'localhost:3000',
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json'],
        }
    });

    await app.register(import('@fastify/cors'), {
        origin: ['http://localhost:8000']
    });

    await app.register(import('@fastify/helmet'), { global: true });

    await app.register(import('fastify-healthcheck'), {
        healthcheckUrl: '/',
        exposeUptime: true
    });

    await app.register(import('@fastify/autoload'), {
        dir: join(import.meta.url, 'src/plugins'),
        options: Object.assign({}, opts)
    })

    await app.register(import('@fastify/autoload'), {
        dir: join(import.meta.url, 'src/routes'),
        options: Object.assign({}, opts)
    });
    
    return app;
};
