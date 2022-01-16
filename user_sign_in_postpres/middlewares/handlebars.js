
const exphbs = require('express-handlebars');
const express_handlebars_sections = require('express-handlebars-sections');

module.exports = app => {
    const hbs = exphbs.create({
        defaultLayout: 'mains',
        extname: '.hbs'
    });
    express_handlebars_sections(hbs);
    app.engine('hbs', hbs.engine);
    app.set('view engine', 'hbs');
    app.set('views', './views');
};