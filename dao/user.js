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

function insert(user) {
    return new Promise(function (resolve, reject) {
        var db = new sqlite3.Database('database/jimo.db', function () {
            db.run(`INSERT INTO user (name , pwd, nickName) VALUES ( "${user.name}" , "${user.pwd}","${user.nickName}");`, function (err) {
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

function myFollower(userId) {
    return new Promise(function (resolve, reject) {
        var db = new sqlite3.Database('database/jimo.db', function () {
            db.all(`select * from user u join follow f on f.follower == u.id and ${userId} == f.followee`, function (err, res) {
                if (!err)
                    resolve(res);
                else
                    reject(err);
            });
        });
    });
}

function myFollowee(userId) {
    return new Promise(function (resolve, reject) {
        var db = new sqlite3.Database('database/jimo.db', function () {
            db.all(`select * from user u join follow f on f.followee == u.id and ${userId} == f.follower`, function (err, res) {
                if (!err)
                    resolve(res);
                else
                    reject(err);
            });
        });
    });
}


module.exports = {
    findOne: findOne,
    insert: insert,
    findByUsername: findByUsername,
    myFollower: myFollower,
    myFollowee: myFollowee
};