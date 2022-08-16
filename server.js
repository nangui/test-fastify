import build from './app.js';
const app = await build({
    logger: true
});
const init = async () => {
    try {
        await app.listen({ port: 3000 });
        app.blipp();
    }
    catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
// Init application
init();
