const appAuth = require('./serverAuth');
const appMovie = require('./serverMovie');
const portAuth = 3000;
const portMovie = 3001;

appAuth.listen(portAuth, () => {
    console.log(`App Auth listening at http://localhost:${portAuth}`);
})

appMovie.listen(portMovie, () => {
    console.log(`App Movie listening at http://localhost:${portMovie}`);
})``