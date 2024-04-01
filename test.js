// test.js

const { db } = require("./pgAdaptor");

db.one('select * from people')
    .then(res => {
        console.log(res);
    });