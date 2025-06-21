const app = require('./server');
const port = process.env.PORT;
const host = process.env.HOST;

app.listen(port, host, () => {
    console.log(`App listening at http://${host}:${port}/`);
});
