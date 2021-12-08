const db = require('./db');
const tbName = 'Users';
const idFieldName = 'f_Username';

module.exports = {
    all: async () => {
        const res = await db.load(tbName);
        return res;
    },
    get: async username => {
        const res = await db.get(tbName, idFieldName, username);
        return res;
    },
    add: async user => {
        const res = await db.add(tbName, user);
        return res;
    },
};