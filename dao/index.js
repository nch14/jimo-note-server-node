var User = require('./user');

User.findOne(1)
    .then((val) => {
        console.log(val)
    })