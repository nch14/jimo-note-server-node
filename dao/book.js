var sqlite3 = require('sqlite3');

function findOne(id) {
    return new Promise(function (resolve, reject) {
        var db = new sqlite3.Database('database/jimo.db', function () {
            db.all("select * from user where id = " + id, function (err, res) {
                if (!err)
                    resolve(res);
                else
                    reject(err);
            });
        });
    });
}

function findAll(userId) {
    return new Promise(function (resolve, reject) {
        var db = new sqlite3.Database('database/jimo.db', function () {
            db.all(`select * from book where userId = ${userId} and state = 1`, function (err, res) {
                if (!err)
                    resolve(res);
                else
                    reject(err);
            });
        });
    });
}

function deleteOne(bookId) {
    return new Promise(function (resolve, reject) {
        var db = new sqlite3.Database('database/jimo.db', function () {
            db.run(`UPDATE book set state = 0 where id == ${bookId};`, function (err) {
                if (err)
                    reject(err);
                else {
                    resolve();
                }
            });
        });
    });
}

function insert(book) {
    return new Promise(function (resolve, reject) {
        var db = new sqlite3.Database('database/jimo.db', function () {
            db.run(`INSERT INTO book (userId , name , state) VALUES ( "${book.userId}" , "${book.name}",1);`, function (err) {
                if (err)
                    reject(err);
                else
                    resolve(this.lastID);
            });
        });
    });
}

function updateName(book) {
    return new Promise(function (resolve, reject) {
        var db = new sqlite3.Database('database/jimo.db', function () {
            db.run(`UPDATE book set name = "${book.name}" where book.id = ${book.id};`, function (err) {
                if (err)
                    reject(err);
                else
                    resolve(this.lastID);
            });
        });
    });
}

function findByUsername(name) {
    console.log('findByUsername', name);
    return new Promise(function (resolve, reject) {
        var db = new sqlite3.Database('database/jimo.db', function () {
            db.all(`select * from user where name = "${name}"`, function (err, res) {
                if (!err)
                    resolve(res);
                else
                    reject(err);
            });
        });
    });
}

module.exports = {
    findAll: findAll,
    insert: insert,
    updateName: updateName,
    deleteOne: deleteOne
};