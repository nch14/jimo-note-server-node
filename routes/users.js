var express = require('express');
var router = express.Router();
var UserRepository = require('../dao/user');
var Book = require('../dao/book');
var Note = require('../dao/note');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/:id/book', function (req, res, next) {
    let userId = req.params.id;
    Book.findAll(userId)
        .then((val) => {
            res.send({code: 200, data: val})
        })
        .catch((err) => {
            res.send({code: 400, data: err});
            console.log(err)
        });
});

router.post('/:id/book', function (req, res, next) {
    console.log(req);
    let userId = req.params.id;
    let book = req.body;
    Book.insert(book)
        .then((val) => {
            res.send({code: 200, data: val})
        })
        .catch((err) => {
            res.send({code: 400, data: err});
            console.log(err)
        });
});

router.put('/:id/book/:bookId', function (req, res, next) {
    console.log(req);
    let userId = req.params.id;
    let book = req.body;
    Book.updateName(book)
        .then((val) => {
            res.send({code: 200, data: val})
        })
        .catch((err) => {
            res.send({code: 400, data: err});
            console.log(err)
        });
});

router.delete('/:id/book/:bookId', function (req, res, next) {
    let userId = req.params.id;
    let bookId = req.params.bookId;
    Book.deleteOne(book)
        .then((val) => {
            res.send({code: 200, data: val})
        })
        .catch((err) => {
            res.send({code: 400, data: err});
            console.log(err)
        });
});

router.get('/:id/book/:bookId', function (req, res, next) {
    let userId = req.params.id;
    let bookId = req.params.bookId;
    Note.findByUserIdAndBookId(userId, bookId)
        .then((val) => {
            res.send({code: 200, data: val})
        })
        .catch((err) => {
            res.send({code: 400, data: err});
            console.log(err)
        });
});

router.get('/:id/note', function (req, res, next) {
    let userId = req.params.id;
    Note.findAll(userId)
        .then((val) => {
            res.send({code: 200, data: val})
        })
        .catch((err) => {
            res.send({code: 400, data: err});
            console.log(err)
        });
});

router.get('/:id/note/zone', function (req, res, next) {
    let userId = req.params.id;
    Note.findZoneAll(userId)
        .then((val) => {
            res.send({code: 200, data: val})
        })
        .catch((err) => {
            res.send({code: 400, data: err});
            console.log(err)
        });
});

router.get('/:id/note/:noteId', function (req, res, next) {
    let userId = req.params.id;
    let noteId = req.params.noteId;
    Note.findOne(noteId)
        .then((val) => {
            res.send({code: 200, data: val})
        })
        .catch((err) => {
            res.send({code: 400, data: err});
            console.log(err)
        });
});


router.post('/:id/note', function (req, res, next) {
    let userId = req.params.id;
    let note = req.body;
    Note.insert(note)
        .then((val) => {
            res.send({code: 200, data: val})
        })
        .catch((err) => {
            res.send({code: 400, data: err});
            console.log(err)
        });
});

router.put('/:id/note/:noteId', function (req, res, next) {
    let userId = req.params.id;
    let note = req.body;
    Note.update(note)
        .then((val) => {
            res.send({code: 200, data: val})
        })
        .catch((err) => {
            res.send({code: 400, data: err});
            console.log(err)
        });
});

router.put('/:id/note/:noteId/stash', function (req, res, next) {
    let userId = req.params.id;
    let note = req.body;
    Note.updateWithoutRelease(note)
        .then((val) => {
            res.send({code: 200, data: val})
        })
        .catch((err) => {
            res.send({code: 400, data: err});
            console.log(err)
        });
});

router.delete('/:id/note/:noteId', function (req, res, next) {
    let userId = req.params.id;
    let noteId = req.params.noteId;
    Note.deleteOne(noteId)
        .then(() => {
            res.send({code: 200, data: true})
        })
        .catch((err) => {
            res.send({code: 400, data: err});
            console.log(err)
        });
});

router.get('/:id/follower', function (req, res, next) {
    let userId = req.params.id;
    UserRepository.myFollower(userId)
        .then((val) => {
            res.send({code: 200, data: val})
        })
        .catch((err) => {
            res.send({code: 400, data: err});
            console.log(err)
        });
});

router.get('/:id/followee', function (req, res, next) {
    let userId = req.params.id;
    UserRepository.myFollowee(userId)
        .then((val) => {
            res.send({code: 200, data: val})
        })
        .catch((err) => {
            res.send({code: 400, data: err});
            console.log(err)
        });
});

module.exports = router;
