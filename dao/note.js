var sqlite3 = require('sqlite3');

function findOne(noteId) {
    return new Promise(function (resolve, reject) {
        var db = new sqlite3.Database('database/jimo.db', function () {
            db.all(`select * from user u JOIN (select * from note n JOIN note_item i on n.currentVersion == i.id and n.id == ${noteId} and n.state > 0) info on u.id == info.userId  `, function (err, res) {
                if (!err)
                    resolve(res);
                else
                    reject(err);
            });
        });
    });
}

function findZoneAll(userId) {
    return new Promise(function (resolve, reject) {
        var db = new sqlite3.Database('database/jimo.db', function () {
            db.all(`select * from user u JOIN (select * from note n JOIN note_item i on n.currentVersion == i.id and (n.state>1 OR (n.userId = ${userId} and n.state = 1))) info on u.id == info.userId  `, function (err, res) {
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
            db.all(`select * from user u JOIN (select * from note n JOIN note_item i on n.currentVersion == i.id and  n.userId = ${userId} and n.state > 0) info on u.id == info.userId  `, function (err, res) {
                if (!err)
                    resolve(res);
                else
                    reject(err);
            });
        });
    });
}

function deleteOne(noteId) {
    return new Promise(function (resolve, reject) {
        var db = new sqlite3.Database('database/jimo.db', function () {
            db.run(`UPDATE note set state = 0 where id == ${noteId};`, function (err) {
                if (err)
                    reject(err);
                else {
                    resolve();
                }
            });
        });
    });
}

function updateWithoutRelease(note) {
    var now = new Date();
    return new Promise(function (resolve, reject) {
        var db = new sqlite3.Database('database/jimo.db', function () {
            var stmt = db.prepare(`INSERT INTO note_item (title , content, noteId, updateTime, userId) VALUES ( ? ,? ,? ,datetime( ?, 'unixepoch'), ?);`);
            stmt.run(note.title, note.content, note.noteId, now, note.userId, function (err) {
                if (err)
                    reject(err);
                else {
                    var versionId = this.lastID;
                    resolve(versionId);
                }
            });
            stmt.finalize();
        });
    });
}

function update(note) {
    var now = new Date();
    return new Promise(function (resolve, reject) {
        var db = new sqlite3.Database('database/jimo.db', function () {
            var stmt = db.prepare(`INSERT INTO note_item (title , content, noteId, updateTime, userId) VALUES ( ? ,? ,? ,datetime( ?, 'unixepoch'), ?);`);
            stmt.run(note.title, note.content, note.noteId, now, note.userId, function (err) {
                if (err)
                    reject(err);
                else {
                    console.log(this);
                    var versionId = this.lastID;
                    db.run(`UPDATE note set currentVersion = ${versionId}, state=${note.state} where id == ${note.noteId};`, function (err) {
                        if (err)
                            reject(err);
                        else {
                            resolve(versionId);
                        }
                    });
                }
            });
            stmt.finalize();
        });
    });
}


function insert(note) {
    return new Promise(function (resolve, reject) {
        var now = new Date();
        var noteId;
        var versionId;
        var db = new sqlite3.Database('database/jimo.db', function () {
            db.run(`INSERT INTO note (userId , state, likeCount,createTime,bookId) VALUES ( ${note.userId} , 1, 0, datetime("${now}", 'unixepoch') , ${note.bookId});`, function (err) {
                if (err)
                    reject(err);
                else {
                    noteId = this.lastID;

                    var stmt = db.prepare(`INSERT INTO note_item (title , content, noteId, updateTime, userId) VALUES ( ? ,? ,? ,datetime( ?, 'unixepoch'), ?);`);
                    stmt.run(note.title, note.content, noteId, now, note.userId, function (err) {
                        if (err)
                            reject(err);
                        else {
                            console.log(this);
                            versionId = this.lastID;
                            db.run(`UPDATE note set currentVersion = ${versionId},state=${note.state} where id == ${noteId};`, function (err) {
                                if (err)
                                    reject(err);
                                else {
                                    resolve(noteId);
                                }
                            });
                        }
                    });
                    stmt.finalize();
                }
            });
        });
    });
}

function findByUserIdAndBookId(userId, bookId) {
    return new Promise(function (resolve, reject) {
        var db = new sqlite3.Database('database/jimo.db', function () {
            db.all(`select * from note n JOIN note_item i on n.currentVersion == i.id and n.userId = ${userId} and n.state > 0 and n.bookId == ${bookId}`, function (err, res) {
                if (!err)
                    resolve(res);
                else
                    reject(err);
            });
        });
    });
}

module.exports = {
    findZoneAll: findZoneAll,
    findOne: findOne,
    findAll: findAll,
    findByUserIdAndBookId: findByUserIdAndBookId,
    insert: insert,
    updateWithoutRelease: updateWithoutRelease,
    update: update,
    deleteOne: deleteOne
};